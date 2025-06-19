import { Request, Response, NextFunction } from "express";
import { recognizeImage } from "../services/ocr.service";
import { parseAadhaar } from "../services/parser.service";
import { RawOcrResult, AadhaarData } from "../types/ocr.type";

export async function uploadAndOcr(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Record<string, Express.Multer.File[]>;
    const [front, back] = [files.front[0].path, files.back[0].path];

    const [fRes, bRes]: RawOcrResult[] = await Promise.all([
      recognizeImage(front),
      recognizeImage(back),
    ]);

    const combined = `${fRes.text}\n${bRes.text}`;
    const parsed: AadhaarData = parseAadhaar(combined);

    res.json(parsed);
  } catch (err) {
    next(err);
  }
}
