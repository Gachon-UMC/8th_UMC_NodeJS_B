export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistStoreId extends Error {
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistMissionId extends Error {
  errorCode = "M001";

  constructor (reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class IsChallenging extends Error {
  errorCode = "M002"

  constructor (reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NoMissions extends Error{
  errorCode = "M003";

  constructor(reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class NoReviews extends Error{
  errorCode = "R002";

  constructor(reason, data){
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
