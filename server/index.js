import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

//Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import todoRoutes from "./routes/todo.route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

let isConnected = false; // Global connection flag

// Set a reasonable timeout for MongoDB connection
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI ?? "");
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  /\.vercel\.app$/,
];

// Standard CORS middleware as a backup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        allowedOrigins.some(
          (pattern) => pattern instanceof RegExp && pattern.test(origin)
        );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(morgan("dev"));

// Add request timeout middleware to avoid 504 errors
app.use((req, res, next) => {
  // Set a server timeout of 30 seconds (Vercel has a 10s limit for Hobby plans)
  req.setTimeout(30000);
  res.setTimeout(30000);
  next();
});

const apiVersion = process.env.API_VERSION || "v1";
const apiPrefix = `/api/${apiVersion}`;
// Routes
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/user`, userRoutes);
app.use(`${apiPrefix}/todo`, todoRoutes);

// Add a health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// CORS error handler
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS not allowed for this origin",
    });
  }
  next(err);
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).send(errorMessage);
});

// Connect to MongoDB at startup for Vercel
connectDB().catch(console.error);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
