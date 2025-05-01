import { responseFromReview } from "../dtos/store.review.dto.js";
import { addReview, getReview } from "../repositories/store.review.repository.js";

export const storeReview = async (data) => {
    const reviewId = await addReview({
        member_id: data.member_id,
        store_id: data.store_id,
        star_rating: data.star_rating,
        content: data.content,
    });

    const review = await getReview(reviewId);

    return responseFromReview(review);
};
