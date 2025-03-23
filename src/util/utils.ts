

export function isSuccess(code: number | string) {
  code = String(code);
  return !code.startsWith('1');
}
