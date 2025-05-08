import { responseFromReview, responseFromReviewList } from "../dtos/review.dto.js"

import{
    addReviewToDB,
    getReviewToDB,
    getAllReviewsFromDB
} from "../repositories/review.repository.js";

export const addReview = async (data) =>{
    const newReviewId = await addReviewToDB({
        title: data.title,
        content: data.content,
        rating: data.rating,
        user_id: data.user_id,
        store_id: data.store_id,
    })

    if(newReviewId === null){
        throw new Error ("존재하지 않은 가게 ID 입니다. ");
    }

    const review = await getReviewToDB(newReviewId);

    return responseFromReview(review);
}

export const showReviews = async (storeId, cursor) => {
    const reviews = await getAllReviewsFromDB(storeId, cursor);
    return responseFromReviewList(reviews);
};