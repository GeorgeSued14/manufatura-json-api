import express from "express";
import { Router } from "express";
import { register, login, getAll, index } from "./controllers/UsersController";

export const routes: Router = express.Router();

routes.get("/", index);
routes.get("/getAll", getAll);
routes.post("/register", register);
routes.post("/login", login);

export default routes;
