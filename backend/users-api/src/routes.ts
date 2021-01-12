import express from "express";
import { Router } from "express";
import { register, login, getAll } from "./controllers/UsersController";

export const routes: Router = express.Router();

routes.get("/", getAll);
routes.post("/register", register);
routes.post("/login", login);

export default routes;
