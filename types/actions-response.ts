export type ActionResponse<T = any> = {
  data: T | null;
  message: string;
  status: number;
  error?: unknown;
};