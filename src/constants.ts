import { IExpErrOpt } from "./interfaces";

export const ExpErrStatuses = {
  success: "success",
  error: "error",
  failed: "failed",
};

export const defaultOptions: IExpErrOpt = {
  defaultErrStatus: ExpErrStatuses.error,
  defaultErrStatusCode: 500,
  defaultErrMessage: "Internal server error",
  //   showStack: true,
  logError: true,
};
