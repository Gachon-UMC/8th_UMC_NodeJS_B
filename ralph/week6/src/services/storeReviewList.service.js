import { responseFromStoreReviewList } from "../dtos/storeReviewList.dto.js";
import { getReviewList } from "./repositories/storeReviewList.repository.js";
export const getStoreReviewList = async (storeId, cursor) => {
    // console.log("data1", storeId);
    const getData = await getReviewList(storeId, cursor);
    console.log("getData", getData);
    return responseFromStoreReviewList(getData);
};
