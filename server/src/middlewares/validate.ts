import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/* middleware for validate payload of request */
function validateSchema(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }
    return next();
  };
}

export { validateSchema };
