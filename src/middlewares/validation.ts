import { validationError } from "errors";
import { NextFunction, Request, Response } from "express";
import { Validator, ValidationError } from "express-json-validator-middleware";

export const { validate } = new Validator({ allErrors: false });

export const validation = (
  error: ValidationError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) return next(error);
  if (!(error instanceof ValidationError)) return next(error);

  response
    .status(400)
    .json(
      validationError(
        (error.validationErrors.body as unknown) as ValidationError[],
        error.message,
        request.url
      )
    );

  next();
};
