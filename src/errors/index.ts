import { ValidationError } from "express-json-validator-middleware";
import { RestErrorResponse } from "models/RestErrorResponse";

export const unexpectedError = (
  detail = "",
  instance = ""
): RestErrorResponse => ({
  type: "unexpected-error",
  status: 500,
  detail,
  instance,
  title: "Some unexpected error occured.",
});

export const validationError = (
  errors: ValidationError[],
  detail = "",
  instance = ""
): RestErrorResponse => ({
  type: "validation-error",
  status: 400,
  title: "Your request parameters didn't validate.",
  detail,
  instance,
  "invalid-params": errors,
});
