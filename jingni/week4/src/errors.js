export class DuplicateUserEmailError extends Error {
  errorCode = "U101";
  statusCode = 409;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistUserId extends Error {
  errorCode = "U001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
  
}

export class NoModifyData extends Error {
  errorCode = "U002";
  statusCode = 400;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistStoreId extends Error {
  errorCode = "S001";
  statusCode = 404;

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistMissionId extends Error {
  errorCode = "M001";
  statusCode = 404;

  constructor (reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StatusError extends Error {
  errorCode = "M002"
  statusCode = 409;

  constructor (reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NoMissions extends Error{
  errorCode = "M003";
  statusCode = 404;

  constructor(reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotChallenging extends Error {
  errorCode = "M004";
  statusCode = 409;

  constructor (reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NoReviews extends Error{
  errorCode = "R002";
  statusCode = 404;

  constructor(reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
