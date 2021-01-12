import express from "express";
import logger from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { routes } from "./routes";
import "./db/index";

dotenv.config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env",
});

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3036;
const HOST = process.env.HOST || "http://127.0.0.1";

app.use(routes);

try {
  app.listen(PORT, () => {
    console.log(`Server Running in ${HOST}:${PORT}`);
  });
} catch (e) {
  throw e;
}
