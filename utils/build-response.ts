export const buildResponse = <T = any>(
  config: { message: string; code: number },
  data: T | null = null,
  error?: unknown
) => ({
  data,
  message: config.message,
  status: config.code,
  ...(error ? { error } : {}),
});
