# Aadhaar OCR System

A simple full‑stack application that uses OCR to extract key details from images of Aadhaar cards.

---

## Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Ashwinn-07/Aadhar-OCR-System.git
   cd Aadhar-OCR-System
   ```

2. **Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env    # add your Cloudinary credentials
   npm run dev             # starts Express on http://localhost:3000
   ```

3. **Frontend**

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env    # set VITE_BACKEND_URL=http://localhost:3000/api
   npm run dev             # starts Vite on http://localhost:5173
   ```

4. **Use the App**

   - Open [http://localhost:5173](http://localhost:5173)
   - Upload the front and back Aadhaar images
   - Click **Run OCR** to see parsed results

---

## Live Demo

- **Frontend**: [https://aadhar-ocr-system-sepia.vercel.app](https://aadhar-ocr-system-sepia.vercel.app)
- **Backend**: [https://aadhar-ocr-system-9k43.onrender.com](https://aadhar-ocr-system-9k43.onrender.com)

---
