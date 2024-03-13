import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ValidationError } from "joi";
import { error } from "../config/errors";

/* this middleware is used for global error handling add common errors in this */
function globalErrorHandler(
  err: Error | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      message: err.details.map((d) => d.message).join(", "),
    });
  }

  switch (err.message) {
    case error.USER_ALREADY_EXIST:
      return res
        .status(401)
        .json({ error: "User`s email or username is already in use" });
    case error.INVALID_CREDENSTIALS:
      return res
        .status(401)
        .json({ error: "provided credentials are not valid" });
    case error.UNAUTHORIZED_USER:
      return res.status(401).json({ error: "Unauthorized User" });
    case error.FORBIDDEN:
      return res
        .status(403)
        .json({ error: "User not have permission to access this route" });
    default:
      console.error(err.stack);
      res.status(500).send("Something Went Wrong!");
  }
}

export { globalErrorHandler };
