import { responseFromReview, responseFromReviewList } from "../dtos/review.dto.js"
import { NoReviews, NotExistStoreId } from "../errors.js";
import { getStoreFromDB } from "../repositories/mission.repository.js";

import{
    addReviewToDB,
    getReviewFromDB,
    getAllReviewsFromDB,
    getAllMyReviewsFromDB,
} from "../repositories/review.repository.js";

export const addReview = async (data) =>{
    const store = await getStoreFromDB(data.store_id);
    if(!store){
      throw new NotExistStoreId("존재하지 않는 가게 ID 입니다.", data)
    }
    const newReviewId = await addReviewToDB({
        title: data.title,
        content: data.content,
        rating: data.rating,
        user_id: data.user_id,
        store_id: data.store_id,
    })

    const review = await getReviewFromDB(newReviewId);
    return responseFromReview(review);
}

export const showReviews = async (storeId, cursor) => {

    const store = await getStoreFromDB(data.store_id);
    if(!store){
      throw new NotExistStoreId("존재하지 않는 가게 ID 입니다.", data)
    }

    const reviews = await getAllReviewsFromDB(storeId, cursor);
    return responseFromReviewList(reviews);
};

export const showMyReviews = async (userId, cursor) => {

    const reviews = await getAllMyReviewsFromDB(userId, cursor);
    if(reviews === null){
        throw new NoReviews("조회 가능한 리뷰가 없습니다.", {userId});
    }
    return responseFromReviewList(reviews)
}