import { NextFunction, Request, Response } from "express";
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
export declare const expErr: (options: IExpErrOpt) => (req: Request, res: Response, next: NextFunction) => void;
export declare const ExpErr: {
    new (options?: IExpErrOpt): {
        config: Function;
        handler: Function;
    };
};
export {};
