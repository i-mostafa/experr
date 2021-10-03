import { NextFunction, Request, Response } from "express";
import { ExpErrStatuses } from "./constants";

interface IExpErrOpt {
  defaultErrStatusCode: number;
  defaultErrStatus?: string;
  defaultErrCode?: number;
  defaultErrMessage?: string;
  showStack?: boolean;
  logError?: boolean;
}

export interface IExpError {
  message: string;
  status?: string | "error" | "failed";
  statusCode?: number;
  errCode?: number | string;
}

const AppErr = class extends Error {
  status?: string | "error" | "failed";
  statusCode?: number;
  errCode?: number | string;

  constructor(err: IExpError & string, options: IExpErrOpt) {
    super(err.message || err || options.defaultErrMessage);
    this.statusCode = err.statusCode || options.defaultErrStatusCode;
    this.status = err.status || options.defaultErrStatus;
    this.errCode = err.errCode || options.defaultErrCode;
    options.showStack && Error.captureStackTrace(this, this.constructor);
  }
};

// class ExpErr extends Error {
//   status?: string | "error" | "failed";
//   statusCode?: number;
//   errCode?: number | string;
//   isOperational: boolean;

//   constructor(err: IExpError & string) {
//     super(err.message || err);
//     this.statusCode = err.statusCode;
//     this.status = err.status;
//     this.errCode = err.errCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

export const expErr =
  (options: IExpErrOpt) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.error = (err: IExpError & string) => next(new AppErr(err, options));
    next();
  };

export const ExpErr = class {
  config: Function;
  handler: Function;

  constructor(
    options: IExpErrOpt = {
      defaultErrStatus: ExpErrStatuses.error,
      defaultErrStatusCode: 500,
      defaultErrMessage: "Internal server error",
      showStack: true,
      logError: true,
    }
  ) {
    console.log(options);
    this.config = (req: Request, res: Response, next: NextFunction) => {
      req.error = (err: IExpError & string) => next(new AppErr(err, options));
      next();
    };

    this.handler = (
      err: IExpError & string & Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      options.logError && console.log(err);

      res.status(err.statusCode || options.defaultErrStatusCode).json({
        status: err.status || options.defaultErrStatus,
        errCode: err.errCode || options.defaultErrCode,
        stack: options.showStack ? err.stack : undefined,
        message: err.message || err || options.defaultErrMessage,
      });
    };
  }
};
