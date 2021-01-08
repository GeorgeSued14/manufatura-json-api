import http from "http";
import express, { request } from "express";
import httpProxy from "express-http-proxy";
import { Request, Response, NextFunction } from "express";
import logger from "morgan";
import helmet from "helmet";
import dotenv from "dotenv-safe";

const app = express();
dotenv.config({
  allowEmptyValues: true,
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env",
});

app.use(express.json());
app.use(logger("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "localhost";

const API_USER = process.env.API_USER || "http://localhost:3030/users";
const API_PRODUCT = process.env.API_PRODUCT || "http://localhost:3030/prodcuts";

const userServiceProxy = httpProxy(`${API_USER}`, {
  proxyErrorHandler: function (err, res, next) {
    console.log(err);
    switch (err && err.code) {
      case "ECONNRESET": {
        return res.status(504).json("Tempo expirado");
      }
      case "ENOTFOUND": {
        return res
          .status(400)
          .json(
            "Houve um erro ao tentar acessar o servidor, entre em contato com o administrador"
          );
      }
      default: {
        next(err);
      }
    }
  },
});

const productServiceProxy = httpProxy(`${API_PRODUCT}`);

app.use("/users", (req: Request, res: Response, next: NextFunction) => {
  userServiceProxy(req, res, next);
});

app.use("/products", (req: Request, res: Response, next: NextFunction) => {
  productServiceProxy(req, res, next);
});

app.get("/", (req: Request, res: Response) => {
  res.json("REST WebAPI Challenge 20200630 Running").status(200);
});

try {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server Running in http://${HOST}:${PORT}`);
  });
} catch (e) {
  throw e;
}
