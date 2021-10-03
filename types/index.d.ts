import { ExpErr } from "./ExpErr";
declare global {
    namespace Express {
        interface Request {
            error: Function;
        }
    }
}
export { ExpErr };
