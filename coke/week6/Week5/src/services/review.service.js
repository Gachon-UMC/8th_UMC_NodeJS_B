import { createReview, getReviewById } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

export const addReview = async (reviewData) => {
  // 가게가 존재하는지 검증
  const store = await getStoreById(reviewData.store_id);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await createReview(reviewData);
  const review = await getReviewById(reviewId);
  
  return review;
};