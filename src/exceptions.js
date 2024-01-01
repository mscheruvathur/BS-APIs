import HttpStatusCode from "./constants/status.js";

export class APIError extends Error {
  constructor(message, statusCode, name) {
    this.name = name ? name : "APIError";
    this.message = message;
    this.statusCode = statusCode;
  }

  static Conflict(message) {
    return new APIError(message, HttpStatusCode.CONFLICT, "APIError::Conflict");
  }

  static BadRequest(message) {
    return new APIError(
      message,
      HttpStatusCode.BAD_REQUEST,
      "APIError::BadRequest"
    );
  }

  static ServerError(message) {
    return new APIError(
      message,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "APIError::ServerError"
    );
  }

  static NotFound(message) {
    return new APIError(
      message,
      HttpStatusCode.NOT_FOUND,
      "APIError::NotFound"
    );
  }

  static PaymentRequired(message) {
    return new APIError(
      message,
      HttpStatusCode.PAYMENT_REQUIRED,
      "APIError::PaymentRequired"
    );
  }

  static AlreadyReported(message) {
    return new APIError(
      message,
      HttpStatusCode.ALREADY_REPORTED,
      "APIError::AlreadyReported"
    );
  }

  static Unauthorized(message = "unauthorized") {
    return new APIError(
      message,
      HttpStatusCode.UNAUTHORIZED,
      "APIError::Unauthorized"
    );
  }

  static Forbidden(message) {
    return new APIError(
      message,
      HttpStatusCode.FORBIDDEN,
      "APIError::Forbidden"
    );
  }

  static NotImplemented() {
    return new APIError(
      "request route and api not found or not implemented",
      HttpStatusCode.NOT_FOUND,
      "APIError::NotImplemented"
    );
  }
}
