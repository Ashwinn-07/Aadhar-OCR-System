import { Request, Response, NextFunction } from "express";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res
    .status(err.status || STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ error: err.message || MESSAGES.ERROR.INTERNAL_SERVER_ERROR });
}
