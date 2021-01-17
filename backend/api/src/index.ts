import express from "express";
import logger from "morgan";
import helmet from "helmet";
import dotenvsafe from "dotenv-safe";
import routes from "./routes/index";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import options from "./config/docs.json";

import { initProxy } from "./server/reverseProxy";
import "./db/index";

dotenvsafe.config({ allowEmptyValues: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "http://localhost";

app.use("/", routes);

initProxy(app);

// const specs = swaggerJsondoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(options));

// app.get(
//   "/docs",
//   swaggerUi.setup(specs, {
//     explorer: true,
//   })
// );

try {
  app.listen(PORT, () => {
    console.log(`Server Running in ${HOST}:${PORT}`);
  });
} catch (e) {
  throw e;
}
