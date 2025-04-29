import express from "express";
import {
  getMe,
  updateDetails,
  createUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controller/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.get("/me", protect, getMe);
router.put("/details", protect, updateDetails);

// Admin only routes
router.route("/").post(protect, authorize("admin"), createUser);

router.route("/all").get(protect, authorize("admin"), getUsers);

router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .delete(protect, authorize("admin"), deleteUser);

export default router;
