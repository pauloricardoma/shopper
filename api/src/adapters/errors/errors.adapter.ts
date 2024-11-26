import { ErrorCode } from "./errors.model";

class CustomAPIError extends Error {
  statusCode?: number;
  error_code?: string;
  error_description?: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class InvalidDataError extends CustomAPIError {
  constructor(message: string, error_code: ErrorCode) {
    super(message);
    this.statusCode = 400;
    this.error_code = error_code;
    this.error_description = message;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message: string, error_code: ErrorCode) {
    super(message);
    this.statusCode = 404;
    this.error_code = error_code;
    this.error_description = message;
  }
}

class NotAcceptableError extends CustomAPIError {
  constructor(message: string, error_code: ErrorCode) {
    super(message);
    this.statusCode = 406;
    this.error_code = error_code;
    this.error_description = message;
  }
}

export {
  CustomAPIError,
  InvalidDataError,
  NotFoundError,
  NotAcceptableError,
};
