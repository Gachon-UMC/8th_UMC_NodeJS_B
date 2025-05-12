export class DuplicateUserEmailError extends Error {
    errorCode = "D001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class NotFoundError extends Error {
    errorCode = "R001"; // Resource Not Found
    statusCode = 404;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class ConflictError extends Error {
    errorCode = "C001"; // Conflict
    statusCode = 409;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}