import { responseFromStoreReviewList } from "../dtos/storeReviewList.dto.js";
import { getReviewLista } from "./repositories/storeReviewList.repository.js";
export const getStoreReviewList = async (data) => {
    console.log("data1", data);
    const getData = await getReviewLista(data);
    console.log("getData", getData);
    return responseFromStoreReviewList(getData);
};
