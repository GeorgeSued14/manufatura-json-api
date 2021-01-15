import express from "express";
import logger from "morgan";
import helmet from "helmet";
import dotenvsafe from "dotenv-safe";
import { routes } from "./routes";
import cors from "cors";
import { initProxy } from "./server/reverseProxy";
import "./db/index";
import { jwt } from "./config/auth";
import { errorHandler } from "./config/handleError";

dotenvsafe.config({ allowEmptyValues: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(jwt());
app.use(routes);

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "http://localhost";

app.use(routes);

initProxy(app);

// app.use(errorHandler);

try {
  app.listen(PORT, () => {
    console.log(`Server Running in ${HOST}:${PORT}`);
  });
} catch (e) {
  throw e;
}
