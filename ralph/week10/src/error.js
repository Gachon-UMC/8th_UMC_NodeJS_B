export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    statusCode = 409;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundStoreIdError extends Error {
    errorCode = "S001";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class ConflictStoreIdMissonIdError extends Error {
    errorCode = "SM002";
    statusCode = 409;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NotFoundUserMissionError extends Error {
    errorCode = "UM003";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NotFoundMyOngoingMissionError extends Error {
    errorCode = "OM004";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundStoreMissionError extends Error {
    errorCode = "SM005";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
export class NotFoundMyReviewListError extends Error {
    errorCode = "MR006";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundStoreReviewListError extends Error {
    errorCode = "SR007";
    statusCode = 404;
    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
