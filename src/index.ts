import { ExpErr, catchAsync } from "./ExpErr";
import AppErr from "./AppError";
import { StatusCodes } from "./StatusCodes";
import ExpErrors from "./ExpErrors";
import { ExpErrStatuses } from "./constants";

declare global {
  namespace Express {
    interface Request {
      error: Function;
    }
  }
}

export { ExpErr, AppErr, ExpErrors, StatusCodes, ExpErrStatuses, catchAsync };
export default new ExpErr();
