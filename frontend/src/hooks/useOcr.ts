import { useState } from "react";
import { uploadAadhaar } from "../services/api";

export function useOCR() {
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [previewFront, setPreviewFront] = useState<string>();
  const [previewBack, setPreviewBack] = useState<string>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (side === "front") {
      setFront(file);
      setPreviewFront(url);
    } else {
      setBack(file);
      setPreviewBack(url);
    }
  }

  async function runOCR() {
    if (!front || !back) return;
    setLoading(true);
    setError(undefined);
    try {
      const resp = await uploadAadhaar(front, back);
      setData(resp.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    previewFront,
    previewBack,
    handleFile,
    runOCR,
    data,
    loading,
    error,
  };
}
