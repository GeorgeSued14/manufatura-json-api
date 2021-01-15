import expressJwt from "express-jwt";
import dotenvsafe from "dotenv-safe";

dotenvsafe.config();
const SECRET_KEY = process.env.SECRET_OR_KEY;
export function jwt() {
  return expressJwt({ secret: `${SECRET_KEY}`, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/register",
    ],
  });
}
