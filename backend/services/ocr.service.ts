import axios from "axios";
import { createWorker, PSM } from "tesseract.js";
import { RawOcrResult } from "../types/ocr.type";

let worker: Awaited<ReturnType<typeof createWorker>>;

export async function initOcrWorker() {
  worker = await createWorker();
  await worker.reinitialize("eng");
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
  });
}

export async function recognizeImage(url: string): Promise<RawOcrResult> {
  const { data } = await axios.get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  });

  const res = await worker.recognize(Buffer.from(data));
  return { text: res.data.text };
}

export async function terminateOcrWorker() {
  await worker.terminate();
}
