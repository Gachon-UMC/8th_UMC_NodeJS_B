import _ from "lodash";

function checkDate(obj) {
    _.forEach(obj, (value) => {
        if (value instanceof Date) {
            value.setHours(value.getHours() + 9);
        } else if (typeof value === "object" && value !== null) {
            checkDate(value);
        }
    });
}

function returnDate(obj) {
    _.forEach(obj, (value) => {
        if (value instanceof Date) {
            value.setHours(value.getHours() - 9);
        } else if (typeof value === "object" && value !== null) {
            returnDate(value);
        }
    });
}

export const dateMiddleware = async (params, next) => {
    checkDate(params.args); // 저장 전 보정
    const result = await next(params); // Prisma 실행
    returnDate(result); // 읽은 후 보정
    return result;
};
