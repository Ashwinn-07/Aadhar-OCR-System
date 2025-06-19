import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export function uploadAadhaar(front: File, back: File) {
  const form = new FormData();
  form.append("front", front);
  form.append("back", back);
  return api.post("/ocr/upload", form);
}
