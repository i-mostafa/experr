import { Application, NextFunction, Request, Response } from "express";
import ExpErrors from "./ExpErrors";
import AppErr from "./AppError";
import { defaultOptions } from "./constants";
import { IExpErrOpt, IExpError } from "./interfaces";

const ExpErr = class {
  options: IExpErrOpt;

  constructor(options: IExpErrOpt = defaultOptions) {
    this.options = options;
    this.fillOptions(options);
  }

  fillOptions(options: IExpErrOpt): void {
    this.options = {
      ...options,
      defaultErrStatus:
        options.defaultErrStatus || defaultOptions.defaultErrStatus,
      defaultErrStatusCode:
        options.defaultErrStatusCode || defaultOptions.defaultErrStatusCode,
      defaultErrMessage:
        options.defaultErrMessage || defaultOptions.defaultErrMessage,
      //   showStack: options.showStack || defaultOptions.showStack,
      logError: options.logError || defaultOptions.logError,
    };
  }
  /**
   * @param  {IExpErrOpt} options?
   * @description add configration options and assign the error function to request
   */
  config(options?: IExpErrOpt) {
    options && this.fillOptions(options);

    return (req: Request, res: Response, next: NextFunction) => {
      req.error = (err: IExpError) => next(new AppErr(err));
      next();
    };
  }
  /**
   * @param  {Application} app
   * @description catch errors of the application and missing targets
   */
  catchAppErrors(app: Application) {
    app.all("*", this.targetNotFound);
    app.use(this.handler);
  }

  handler = (
    err: IExpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.options.logError && console.log(err);

    res.status(err.statusCode || this.options.defaultErrStatusCode).json({
      status: err.status || this.options.defaultErrStatus,
      errCode: err.errCode || this.options.defaultErrCode,
      // stack: options.showStack ? err.stack : undefined,
      message: err.message || err || this.options.defaultErrMessage,
    });
  };

  targetNotFound = (req: Request, res: Response, next: NextFunction) =>
    next(ExpErrors.targetNotFound(req));
};

/**
 *  @description ExpErr is an error handler model for express framework
 */

export default new ExpErr();
