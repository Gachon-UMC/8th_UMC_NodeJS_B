import { responseFromReviews } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";

export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
};
