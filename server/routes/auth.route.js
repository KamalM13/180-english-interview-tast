import express from "express";
import {
  register,
  login,
  updatePassword,
} from "../controller/auth.controller.js";

import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.put("/updatepassword", protect, updatePassword);

export default router;
