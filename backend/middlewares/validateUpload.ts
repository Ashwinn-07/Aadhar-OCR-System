import { Request, Response, NextFunction } from "express";

export function validateUpload(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const files = req.files as Record<string, Express.Multer.File[]>;
  if (!files?.front?.length || !files?.back?.length) {
    res.status(400).json({ error: "Both front and back images are required." });
    return;
  }
  next();
}
