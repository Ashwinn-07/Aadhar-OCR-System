import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { initOcrWorker } from "./services/ocr.service";

(async () => {
  await initOcrWorker();
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use("/api", routes);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log("Server up!"));
})();
