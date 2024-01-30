export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export interface PromiseToHandle<T = void> {
  resolve: [T] extends [void] ? () => void : (result: T) => void;
  reject: (error: unknown) => void;
  promise: Promise<T>;
}

export function promiseToHandle<T = void>(): PromiseToHandle<T> {
  let resolve!: any;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((resolveCb, rejectCb) => {
    resolve = resolveCb;
    reject = rejectCb;
  });
  return { promise, resolve, reject };
}

export function rejectOnTimeout<T = void>(
  promise: Promise<T>,
  { maxDurationMs }: { maxDurationMs: number },
): Promise<T> {
  const { promise: wrapper, resolve, reject } = promiseToHandle<T>();
  setTimeout(() => {
    reject(
      new Error(
        `Timeout, the maximum duration '${maxDurationMs}ms' is exceeded.`,
      ),
    );
  }, maxDurationMs);
  promise.then(
    (result) => resolve(result),
    (error) => reject(error),
  );
  return wrapper;
}

export type AsyncTask = (...args: any[]) => Promise<any>;

export interface EnqueueAsyncOptions {
  /**
   * Default value is `0`.
   */
  delayMs?: number;

  /**
   * A task with a duration upper than this value will not block the execution
   * of the next task.
   */
  maxDurationMs?: number;
}

export function enqueueAsync<T extends AsyncTask>(
  task: T,
  options?: EnqueueAsyncOptions,
): T;
export function enqueueAsync(
  options?: EnqueueAsyncOptions,
): <T extends AsyncTask>(task: T) => T;
export function enqueueAsync(arg1?: any, arg2?: any): any {
  const singleTask: AsyncTask | undefined =
    typeof arg1 === 'function' ? arg1 : undefined;
  const options: EnqueueAsyncOptions = (singleTask ? arg2 : arg1) ?? {};
  const delayMs = options.delayMs ?? 0;
  const maxDurationMs = options.maxDurationMs;

  let nextCallTime: number | undefined;
  let currentPromise: Promise<any> | undefined;

  function toEnqueuedTask(task: AsyncTask) {
    return async (...args: any[]) => {
      let previous = currentPromise;
      const { promise, reject, resolve } = promiseToHandle<unknown>();
      currentPromise = promise;
      if (previous) {
        if (maxDurationMs !== undefined) {
          previous = rejectOnTimeout(previous, { maxDurationMs });
        }
        try {
          await previous;
        } catch {
          // Nothing to do.
        }
      }
      const stillWaitMs =
        nextCallTime === undefined ? 0 : nextCallTime - Date.now();
      nextCallTime = Date.now() + delayMs;
      if (stillWaitMs > 0) {
        nextCallTime += stillWaitMs;
        await wait(stillWaitMs);
      }
      try {
        const result = await task(...args);
        if (currentPromise === promise) {
          currentPromise = undefined;
        }
        resolve(result);
      } catch (error) {
        if (currentPromise === promise) {
          currentPromise = undefined;
        }
        reject(error);
      }
      return promise;
    };
  }

  if (singleTask) return toEnqueuedTask(singleTask);
  return toEnqueuedTask;
}

export interface EnqueueOrMergeAsyncOptions<T extends AsyncTask> {
  /**
   * Default value is `0`.
   */
  delayMs?: number;
  mergeWith?: (...args: Parameters<T>) => string;
}

export function enqueueOrMergeAsync<T extends AsyncTask>(
  task: T,
  options: EnqueueOrMergeAsyncOptions<T> = {},
): T {
  const delayMs = options.delayMs ?? 0;
  const mergeWith = options.mergeWith ?? (() => 'any');

  const runningTasks = new Map<string, Promise<any>>();
  let nextCallTime: number | undefined;

  return (async (...args: any[]) => {
    const mergeKey = mergeWith(...(args as any));
    const currentPromise = runningTasks.get(mergeKey);

    if (currentPromise) return currentPromise;
    const { promise, reject, resolve } = promiseToHandle<unknown>();
    runningTasks.set(mergeKey, promise);
    const stillWaitMs =
      nextCallTime === undefined ? 0 : nextCallTime - Date.now();
    nextCallTime = Date.now() + delayMs;
    if (stillWaitMs > 0) {
      nextCallTime += stillWaitMs;
      await wait(stillWaitMs);
    }
    try {
      const result = await task(...args);
      runningTasks.delete(mergeKey);
      resolve(result);
    } catch (error) {
      runningTasks.delete(mergeKey);
      reject(error);
    }
    return promise;
  }) as T;
}

export interface DebounceOptions {
  onError?: (error: unknown) => void;
  /**
   * Default value is `200`.
   */
  delayMs?: number;
}

export type DebouncedFunction<T extends (...args: any[]) => void> = T & {
  readonly cancel: () => void;
};

export function debounce<T extends (...args: any[]) => void>(
  cb: T,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const delayMs = options.delayMs ?? 200;
  const onError = options.onError ?? console.error;
  let nextTime = 0;
  let timeoutHandler: any;
  let nextArgs: unknown[] | undefined;
  const call = () => {
    if (!nextArgs) return;
    const args = nextArgs;
    nextArgs = undefined;
    timeoutHandler = undefined;
    nextTime = Date.now() + delayMs;
    try {
      cb(...args);
    } catch (err) {
      onError(err);
    }
  };
  const result = (...args: unknown[]) => {
    nextArgs = args;
    if (timeoutHandler !== undefined) return;
    const now = Date.now();
    if (now >= nextTime) {
      call();
      return;
    }
    timeoutHandler = setTimeout(call, nextTime - now);
  };
  result.cancel = () => {
    if (timeoutHandler !== undefined) clearTimeout(timeoutHandler);
    nextTime = 0;
    timeoutHandler = undefined;
    nextArgs = undefined;
  };
  return result as any;
}
