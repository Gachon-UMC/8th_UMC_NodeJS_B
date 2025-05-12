import { responseFromReviews } from "../dtos/user.review.dto.js";
import { getAllUserReviews } from "../repositories/user.review.repository.js";

export const listUserReviews = async (userId, cursor) => {
    const reviews = await getAllUserReviews(userId, cursor);
    return responseFromReviews(reviews);
};
