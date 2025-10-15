import { type Request, type Response, type NextFunction } from "express";
import z from "zod";

export const validate = <T>(schema: z.ZodType<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const data = await schema.parseAsync(body);

      req.body = data;

      next();
    } catch (error) {
      next(error);
    }
  };
};
