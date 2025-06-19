import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { initOcrWorker } from "./services/ocr.service";

dotenv.config();
(async () => {
  await initOcrWorker();
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log("Server up!"));
})();
