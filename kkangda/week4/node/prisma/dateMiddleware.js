import { DateTime } from "luxon";
import _ from "lodash";

function returnDate(obj) {
    _.forEach(obj, (value, key) => {
        if (value instanceof Date) {
            // Luxon으로 변환 후 날짜만 추출 (KST 기준)
            const kst = DateTime.fromJSDate(value, { zone: "Asia/Seoul" });
            obj[key] = kst.toFormat("yyyy-MM-dd"); // 원하는 형식으로!
        } else if (typeof value === "object" && value !== null) {
            returnDate(value);
        }
    });
}

export const dateMiddleware = async (params, next) => {
    const result = await next(params); // Prisma 실행
    returnDate(result); // KST 반환
    return result;
};
