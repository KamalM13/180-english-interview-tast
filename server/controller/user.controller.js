import User from "../models/user.model.js";
import Todo from "../models/todo.model.js";
import asyncHandler from "../middleware/async.js";
import bcrypt from "bcryptjs";

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});

export const updateDetails = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate email is not taken by another user
  if (email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email is already in use",
      });
    }
  }

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (email) fieldsToUpdate.email = email;
  if (phone) fieldsToUpdate.phone = phone;

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: "User with this email already exists",
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with specified role (admin can set any role)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
    phone: phone,
  });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  // Check if the user is trying to delete themselves
  if (user._id.toString() === req.user.id) {
    return res.status(400).json({
      success: false,
      error: "You cannot delete your own account",
    });
  }

  // delete user
  await User.findByIdAndDelete(req.params.id);

  //cascade delete all todos of the user
  await Todo.deleteMany({ user: req.params.id });

  res.status(200).json({
    success: true,
    data: {},
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    data: users,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.status(200).json({
    success: true,
    data: "Password has been reset successfully",
  });
});
