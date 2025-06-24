export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
    statusCode = 400;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundStoreIdOrCusorError extends Error {
    errorCode = "S001";
    statusCode = 404;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundStoreError extends Error {
    errorCode = "S002";
    statusCode = 404;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class ExceptionError extends Error {
    errorCode = "E001";
    statusCode = 404;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class AlreadyChallengingError extends Error {
    errorCode = "U002";
    statusCode = 400;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NotFoundUserIdOrCusorError extends Error {
    errorCode = "U003";
    statusCode = 404;

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}
