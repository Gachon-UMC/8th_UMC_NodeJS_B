import { responseFromReview } from "../dtos/store.review.dto.js";
import { addReview, getReview } from "../repositories/store.review.repository.js";

export const storeReview = async (data) => {
    const reviewId = await addReview({
        member_id: data.member_id,
        store_id: data.store_id,
        star_rating: data.star_rating,
        content: data.content,
    });

    if (reviewId === null) {
        throw new Error("가게가 존재하지 않습니다.");
    }

    const review = await getReview(reviewId);

    return responseFromReview(review);
};
