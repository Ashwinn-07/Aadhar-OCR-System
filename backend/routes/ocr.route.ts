import { Router } from "express";
import { uploadAndOcr } from "../controllers/ocr.controller";
import { upload } from "../config/cloudinary";
import { validateUpload } from "../middlewares/validateUpload";

const router = Router();
router.post(
  "/upload",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  validateUpload,
  uploadAndOcr
);

export default router;
