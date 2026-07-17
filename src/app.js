import express from "express";
import cors from "cors";

import * as studentController from "./controllers/student.controller.js";
import asyncHandler from "./middlewares/asyncHandler.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        uptime:process.uptime()
    });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Feedback API is running"
  });
});

app.post(
  "/api/students",
  asyncHandler(studentController.createNewStudent)
);

app.get(
  "/api/students",
  asyncHandler(studentController.getStudents)
);

app.get(
  "/api/students/:id",
  asyncHandler(studentController.getStudentDto)
);

app.put(
  "/api/students/:id",
  asyncHandler(studentController.updateStudent)
);

app.delete(
  "/api/students/:id",
  asyncHandler(studentController.deleteStudent)
);

app.use(errorMiddleware);

export default app;