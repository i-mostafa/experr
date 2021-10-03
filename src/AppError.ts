import { IExpError } from "./interfaces";

export default class AppErr extends Error {
  status?: string | "error" | "failed";
  statusCode?: number;
  errCode?: number | string;

  constructor(err: IExpError) {
    super(err.message || String(err));
    this.statusCode = err.statusCode;
    this.status = err.status;
    this.errCode = err.errCode;
    // options.showStack && Error.captureStackTrace(this, this.constructor);
  }
}
