import express, { Router } from "express";

export const routes = express.Router();

routes.get("/", (req, res) => {
  res.json("Hello s");
});
