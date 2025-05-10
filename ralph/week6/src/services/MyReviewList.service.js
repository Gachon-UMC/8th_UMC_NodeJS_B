import { getMyReviewList } from "./repositories/myReviewList.repository.js";
import { responseToMyReviewList } from "../dtos/myReviewList.dto.js";
export const MyReviewList = async (userId, cursor) => {
    const data = await getMyReviewList(userId, cursor);
    return responseToMyReviewList(data);
};
