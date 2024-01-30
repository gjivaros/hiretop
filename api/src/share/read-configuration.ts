import { createValidator } from '@typeonly/validator';
import { readFileSync } from 'fs';
import { isAbsolute, join } from 'path';
import { cwd } from 'process';
import { messageOf } from 'src/helpers/tiny-helpers';

export interface ReadConfigFileOptions {
  typeOnlyBundle: any;
  typeName: string;
  defaultFileName?: string;
}

export function readConfigFileSync<T>({
  typeOnlyBundle,
  typeName,
  defaultFileName,
}: ReadConfigFileOptions): T {
  const paramIndex = process.argv.indexOf('--config');
  const hasParam = paramIndex !== -1 && paramIndex + 1 < process.argv.length;
  let confFile = hasParam ? process.argv[paramIndex + 1] : defaultFileName;
  if (!confFile) throw new Error('Missing configuration file parameter');
  if (!isAbsolute(confFile)) {
    confFile = join(cwd(), confFile);
  }
  let data: any;
  try {
    const content = readFileSync(confFile, 'utf8');
    data = JSON.parse(content);
  } catch (err: any) {
    throw new Error(
      `Cannot load the configuration file '${confFile}': ${messageOf(err)}`,
    );
  }
  validateConfiguration<T>(data, typeOnlyBundle, typeName);
  return data;
}

function validateConfiguration<T>(
  data: unknown,
  typeOnlyBundle: any,
  confTypeName: string,
): asserts data is T {
  const validator = createValidator({
    bundle: typeOnlyBundle,
  });
  const result = validator.validate(confTypeName, data);
  if (!result.valid)
    throw new Error(
      `Invalid config file: ${result.error ?? '(missing message)'}`,
    );
}
