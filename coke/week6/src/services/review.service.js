import { createReview, getReviewById } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { NotFoundError } from "../errors.js";

export const addReview = async (reviewData) => {
  // 가게 유무 확인
  const store = await getStoreById(reviewData.store_id);
  if (!store) {
    throw new NotFoundError("존재하지 않는 가게입니다.", { storeId: reviewData.store_id });
  }

  const reviewId = await createReview(reviewData);
  const review = await getReviewById(reviewId);
  
  return review;
};