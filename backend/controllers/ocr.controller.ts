import { Request, Response, NextFunction } from "express";
import { recognizeImage } from "../services/ocr.service";
import { parseAadhaar } from "../services/parser.service";
import { deleteFromCloudinary } from "../config/cloudinary";
import { RawOcrResult, AadhaarData } from "../types/ocr.type";
import { STATUS_CODES } from "../utils/constants";

export async function uploadAndOcr(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const files = req.files as Record<string, Express.Multer.File[]>;
  const frontUrl = files.front[0].path;
  const backUrl = files.back[0].path;

  try {
    const [fRes, bRes]: RawOcrResult[] = await Promise.all([
      recognizeImage(frontUrl),
      recognizeImage(backUrl),
    ]);

    const combined = `${fRes.text}\n${bRes.text}`;

    try {
      const parsed: AadhaarData = parseAadhaar(combined);

      res.status(STATUS_CODES.OK).json(parsed);

      deleteFromCloudinary([frontUrl, backUrl]).catch((err) =>
        console.error("Background cleanup failed:", err)
      );
    } catch (validationError: any) {
      deleteFromCloudinary([frontUrl, backUrl]).catch((err) =>
        console.error("Background cleanup failed:", err)
      );

      res.status(STATUS_CODES.BAD_REQUEST).json({
        error: validationError.message,
      });
    }
  } catch (err) {
    deleteFromCloudinary([frontUrl, backUrl]).catch((cleanupErr) =>
      console.error("Background cleanup failed:", cleanupErr)
    );
    next(err);
  }
}
