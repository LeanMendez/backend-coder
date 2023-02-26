import { Router } from "express";
import {
  getUsers,
  getUserById,
  saveUser,
  updateUserById,
  deleteUsers,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", saveUser);
router.put("/:id", updateUserById);
router.delete("/", deleteUsers);
router.delete("/:id", deleteUserById);

export { router as userRouter };
