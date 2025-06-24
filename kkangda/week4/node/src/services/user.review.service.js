import { responseFromReviews } from "../dtos/user.review.dto.js";
import { NotFoundUserIdOrCusorError } from "../errors.js";
import { getAllUserReviews } from "../repositories/user.review.repository.js";

export const listUserReviews = async (userId, cursor) => {
    const reviews = await getAllUserReviews(userId, cursor);

    if (reviews === null) {
        throw new NotFoundUserIdOrCusorError("user ID가 일치하지 않거나 cursor가 올바르지 않습니다.", {
            userId,
            cursor,
        });
    }

    return responseFromReviews(reviews);
};
