import { responseFromReview } from "../dtos/store.review.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import { addReview, getReview } from "../repositories/store.review.repository.js";

export const storeReview = async (data) => {
    const reviewId = await addReview({
        userId: data.userId,
        storeId: data.storeId,
        starRating: data.starRating,
        content: data.content,
    });

    if (reviewId === null) {
        throw new DuplicateUserEmailError("가게가 존재하지 않습니다.", data);
    }

    const review = await getReview(reviewId);

    return responseFromReview(review);
};
