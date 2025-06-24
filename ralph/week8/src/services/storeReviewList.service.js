import { responseFromStoreReviewList } from "../dtos/storeReviewList.dto.js";
import { getReviewList } from "./repositories/storeReviewList.repository.js";
import { NotFoundStoreReviewListError } from "../error.js";
export const getStoreReviewList = async (storeId, cursor) => {
    const getData = await getReviewList(storeId, cursor);
    if (getData.length === 0) {
        throw new NotFoundStoreReviewListError(
            "해당 가게의 리뷰가 없습니다.",
            getData
        );
    }
    return responseFromStoreReviewList(getData);
};
