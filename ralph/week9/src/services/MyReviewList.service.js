import { getMyReviewList } from "./repositories/myReviewList.repository.js";
import { responseToMyReviewList } from "../dtos/myReviewList.dto.js";
import { NotFoundMyReviewListError } from "../error.js";
export const MyReviewList = async (userId, cursor) => {
    const data = await getMyReviewList(userId, cursor);
    if (data.length === 0) {
        throw new NotFoundMyReviewListError(
            "현재 작성한 리뷰가 없습니다.",
            data
        );
    }
    return responseToMyReviewList(data);
};
