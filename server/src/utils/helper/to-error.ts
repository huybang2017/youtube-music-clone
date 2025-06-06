export function toError(err: unknown): Error {
  if (err instanceof Error) return err;
  try {
    return new Error(JSON.stringify(err));
  } catch {
    return new Error(String(err));
  }
}
