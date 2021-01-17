import { Router } from "express";
import { changePassword, login, logout } from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router: Router = Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/chage-password", [checkJwt], changePassword);

export default router;
