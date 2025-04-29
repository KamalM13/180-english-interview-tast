import Todo from "../models/todo.model.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";

export const getTodos = asyncHandler(async (req, res, next) => {
  const { status, search } = req.query;

  const query = { userId: req.user.id };

  if (status && ["pending", "in-progress", "completed"].includes(status)) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const todos = await Todo.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos,
  });
});

export const getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  if (todo.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`User not authorized to access this todo`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

export const createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: todo,
  });
});

export const updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  if (todo.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`User not authorized to update this todo`, 401)
    );
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: todo,
  });
});

export const deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the todo
  if (todo.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`User not authorized to delete this todo`, 401)
    );
  }

  await todo.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

export const updateTodoStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status || !["pending", "in-progress", "completed"].includes(status)) {
    return next(new ErrorResponse("Please provide a valid status", 400));
  }

  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the todo
  if (todo.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`User not authorized to update this todo`, 401)
    );
  }

  todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: todo,
  });
});
