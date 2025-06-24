import { responseFromReview } from "../dtos/addReview.dto.js";
import {
    addReview,
    getFirstReview,
} from "./repositories/addReview.repository.js";
import { NotFoundStoreIdError } from "../error.js";

export const addReviewStore = async (data) => {
    const addReviewId = await addReview({
        user_id: data.user_id,
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
        name: data.name,
    });
    if (addReviewId === null) {
        throw new NotFoundStoreIdError("가게가 존재하지 않습니다.", data);
    }
    const firstReview = await getFirstReview(addReviewId);
    return responseFromReview(firstReview);
};
