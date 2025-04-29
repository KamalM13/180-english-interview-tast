import express from "express";
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} from "../controller/todo.controller.js";

import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

router.route("/:id/status").patch(updateTodoStatus);

export default router;
