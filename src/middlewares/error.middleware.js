import AppError from "../utils/AppError.js";

function errorMiddleware(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: err.issues.map((e) => e.message).join(", ")
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
}

export default errorMiddleware;