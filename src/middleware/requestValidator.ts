import { Schema } from "joi";

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
const requestValidator = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({ ...req.body, ...req.params, ...req.query });
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details, message } = error;
      const messages = details.map(i => i.message).join(",");
      next(new CustomError(messages,400))
    }
  };
};
export default requestValidator;
