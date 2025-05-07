import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, getFirstReview } from "./repositories/review.repository.js";
import { pool } from "../db.config.js";

export const addReviewStore = async (data) => {
    console.log("data", data);
    const addReviewId = await addReview({
        user_id: data.user_id,
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
        name: data.name,
    });
    console.log("addReviewId", addReviewId);
    const firstReview = await getFirstReview(addReviewId);
    console.log("firstReview", firstReview);
    return responseFromReview(firstReview);
};
