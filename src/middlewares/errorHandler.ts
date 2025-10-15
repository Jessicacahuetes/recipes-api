import { type ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { NotFoundError } from "../class/errorCustom";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const formatted = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
      expected: (issue as any).expected,
      received: (issue as any).received,
    }));

    res.status(400).json({
      status: "zod validation error",
      data: formatted,
    });
  } else if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({
      status: "not found",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: err.message || "Erreur serveur",
    });
  }
};
