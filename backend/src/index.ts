// src/index.ts
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import membershipCategoriesRouter from "./routes/membershipCategories";
import membersRouter from "./routes/members";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------
// ✅ Middlewares
// ---------------------------
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// ---------------------------
// ✅ CORS Setup
// ---------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ---------------------------
// ✅ Global Logging Middleware
// ---------------------------
app.use((req, res, next) => {
  console.log(`[GLOBAL] ${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// ---------------------------
// ✅ Routes
// ---------------------------
app.use("/api/membership-categories", membershipCategoriesRouter);
app.use("/api/members", membersRouter);

// ---------------------------
// ✅ Test Route for POST Debugging
// ---------------------------
app.post("/api/members/test", (req, res) => {
  console.log("✅ /api/members/test hit with body:", req.body);
  res.json({ success: true, message: "Test POST route working" });
});

// ---------------------------
// ✅ Health Check
// ---------------------------
app.get("/", (req, res) => {
  res.send("🚀 AIMSN Backend is running");
});

// ---------------------------
// ✅ Start Server
// ---------------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
