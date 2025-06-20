import { Request, Response, NextFunction } from "express";
import { MESSAGES, STATUS_CODES } from "../utils/constants";

export function validateUpload(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const files = req.files as Record<string, Express.Multer.File[]>;
  if (!files?.front?.length || !files?.back?.length) {
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: MESSAGES.ERROR.IMAGES_REQUIRED });
    return;
  }
  next();
}
