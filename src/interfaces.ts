export interface IExpErrOpt {
  defaultErrStatusCode: number;
  defaultErrStatus?: string;
  defaultErrCode?: number;
  defaultErrMessage?: string;
  //   showStack?: boolean;
  logError?: boolean;
}

export interface IExpError {
  message: string;
  status?: string | "error" | "failed";
  statusCode?: number;
  errCode?: number | string;
}
