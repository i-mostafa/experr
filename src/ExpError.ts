export interface IExpError {
  message: string;
  status?: string | "error" | "failed";
  statusCode?: number;
  errCode?: number | string;
}
