import { AadhaarData } from "../types/ocr.type";

export function parseAadhaar(rawText: string): AadhaarData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const data: AadhaarData = {};

  const name = lines.find((l) => /^Name\s*:/i.test(l));
  name && (data.name = name.split(":")[1].trim());

  const dob = lines.find((l) => /DOB\s*:\s*\d{2}\/\d{2}\/\d{4}/i.test(l));
  dob && (data.dob = dob.match(/\d{2}\/\d{2}\/\d{4}/)![0]);

  const uid = lines.find((l) => /\d{4}\s*\d{4}\s*\d{4}/.test(l));
  uid && (data.aadhaarNumber = uid.replace(/\s+/g, ""));

  return data;
}
