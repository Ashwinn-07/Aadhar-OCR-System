import { AadhaarData } from "../types/ocr.type";

export function parseAadhaar(rawText: string): AadhaarData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const data: AadhaarData = {};

  const probableName = lines.find((line, idx) => {
    return (
      /^[A-Z][a-z]+\s+[A-Z][a-z]+/.test(line) &&
      lines[idx + 1]?.toLowerCase().includes("dob")
    );
  });
  if (probableName) data.name = probableName;

  const dobLine = lines.find((l) => /\d{2}\/\d{2}\/\d{4}/.test(l));
  dobLine && (data.dob = dobLine.match(/\d{2}\/\d{2}\/\d{4}/)?.[0]);

  const genderLine = lines.find((l) => /male|female|transgender/i.test(l));
  if (genderLine) {
    const match = genderLine.match(/male|female|transgender/i);
    match && (data.gender = match[0].toLowerCase());
  }

  const uid = lines.find((l) => /\d{4}\s*\d{4}\s*\d{4}/.test(l));
  uid && (data.aadhaarNumber = uid.replace(/\s+/g, ""));

  const pincodeLineIndex = lines.findIndex((l) => /\b\d{6}\b/.test(l));
  if (pincodeLineIndex !== -1) {
    data.pincode = lines[pincodeLineIndex].match(/\b\d{6}\b/)![0];

    const addressLines = lines
      .slice(Math.max(0, pincodeLineIndex - 3), pincodeLineIndex + 1)
      .filter(
        (line) =>
          !/\d{4}\s+\d{4}\s+\d{4}/.test(line) &&
          !/^\s*[a-z]{1,3}\s*$/i.test(line) &&
          !line.toLowerCase().includes("fers")
      );

    data.address = addressLines.join(", ");
    if (data.address) {
      const garbageWords = [
        "udr",
        "ris",
        "fers",
        "brom",
        "uc",
        "fersr",
        "3lidatst",
        "anefty",
        "Address",
        "S/O",
        "S\\O",
        "D/O",
        "W/O",
      ];

      let cleanAddress = data.address;

      for (const word of garbageWords) {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        cleanAddress = cleanAddress.replace(regex, "");
      }

      cleanAddress = cleanAddress.replace(/\d{4}\s+\d{4}\s+\d{4}/g, "");

      cleanAddress = cleanAddress
        .replace(/[^a-zA-Z0-9,\-\/ ]/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/,+/g, ",")
        .replace(/\s*,\s*/g, ", ")
        .replace(/^,|,$/g, "")
        .trim();

      const parts = cleanAddress.split(",").map((p: any) => p.trim());
      const filteredParts = parts.filter((part: any, index: any) => {
        return index > 0 || part.length > 6;
      });

      data.address = filteredParts.join(", ");
    }
  }

  return data;
}
