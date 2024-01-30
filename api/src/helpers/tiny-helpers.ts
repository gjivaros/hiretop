export function messageOf(error: any): string {
  if (typeof error === 'string') return error;
  if (typeof error?.message === 'string') return error.message;
  return `Unexpected error (${typeof error})`;
}
