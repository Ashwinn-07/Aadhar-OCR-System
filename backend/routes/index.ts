import { Router } from "express";
import ocrRoutes from "./ocr.route";

const router = Router();
router.use("/ocr", ocrRoutes);
export default router;
