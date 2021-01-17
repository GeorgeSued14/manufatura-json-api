import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import {
  register,
  remove,
  update,
  getOneById,
  getAll,
  index,
} from "../controllers/UsersController";
import { checkRole } from "../middlewares/checkRole";

export const router: Router = Router();

router.get("/home", index);
router.get("/", [checkJwt, checkRole(["ADMIN"])], getAll);

router.post("/register", register);
router.get("/:id", [checkJwt, checkRole(["ADMIN"])], getOneById);

router.patch("/:id", [checkJwt, checkRole(["ADMIN"])], update);
router.delete("/:id", [checkJwt, checkRole(["ADMIN"])], remove);

export default router;
