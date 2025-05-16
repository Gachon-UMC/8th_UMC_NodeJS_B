import { responseFromReviews } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js";
import { NotFoundStoreIdOrCusorError } from "../errors.js";

export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getAllStoreReviews(storeId, cursor);

    if (reviews === null) {
        throw new NotFoundStoreIdOrCusorError("store ID가 일치하지 않거나 cursor가 올바르지 않습니다.", {
            storeId,
            cursor,
        });
    }

    return responseFromReviews(reviews);
};
