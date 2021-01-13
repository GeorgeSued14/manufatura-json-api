import http from "http";
import express from "express";
import { Request, Response } from "express";
import logger from "morgan";
import helmet from "helmet";
import dotenv from "dotenv-safe";
import cors from "cors";

const app = express();

dotenv.config({
  allowEmptyValues: true,
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env",
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

const PORT: number = parseInt(`${process.env.PORT}`) || 3030;
const HOST: String = process.env.HOST || "localhost";

import { initRoutes } from "../src/routes";
initRoutes(app);

try {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server Running in http://${HOST}:${PORT}`);
  });
} catch (e) {
  throw e;
}
