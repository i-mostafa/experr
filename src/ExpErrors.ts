import { Request } from "express";
import { AppErr, ExpErrStatuses } from ".";
import { StatusCodes } from "./StatusCodes";

const ExpErrors = class {
  targetNotFound(req: Request) {
    return new AppErr({
      message: `This target '${req.originalUrl}'' is not found with ${req.method} 'method'`,
      status: ExpErrStatuses.error,
      statusCode: StatusCodes.NOT_FOUND,
      errCode: "E-1",
    });
  }

  signInFaild() {
    return new AppErr({
      message: `Incorrect email or password `,
      status: ExpErrStatuses.failed,
      statusCode: StatusCodes.BAD_REQUEST,
      errCode: "E-2",
    });
  }
  noQery(msg: string) {
    return new AppErr({
      message: msg,
      status: ExpErrStatuses.error,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errCode: "E-3",
    });
  }
  noDocumentMatched(msg: string) {
    return new AppErr({
      message: `No document found : '${msg}'`,
      status: ExpErrStatuses.failed,
      statusCode: StatusCodes.BAD_REQUEST,
      errCode: "E-4",
    });
  }

  emailAlreadyExists(email: string) {
    return new AppErr({
      message: `This Email is Already Exists : '${email}'`,
      status: ExpErrStatuses.failed,
      statusCode: StatusCodes.CONFLICT,
      errCode: "E-5",
    });
  }
  notAuth() {
    return new AppErr({
      message: `Not Authorized`,
      status: ExpErrStatuses.error,
      statusCode: StatusCodes.FORBIDDEN,
      errCode: "E-6",
    });
  }
  serverError() {
    return new AppErr({
      message: `Not Authorized`,
      status: ExpErrStatuses.error,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errCode: "E-7",
    });
  }
  authFaild() {
    return new AppErr({
      message: `Authorization Faild`,
      status: ExpErrStatuses.failed,
      statusCode: StatusCodes.FORBIDDEN,
      errCode: "E-8",
    });
  }
  validationError(msg: String) {
    return new AppErr({
      message: `Validation Error: '${msg}'`,
      status: ExpErrStatuses.failed,
      statusCode: StatusCodes.BAD_REQUEST,
      errCode: "E-9",
    });
  }
};

export default new ExpErrors();
