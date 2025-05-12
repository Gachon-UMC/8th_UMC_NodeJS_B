import { getStoreById, getStoreReviews, getReviewImages, getReviewReplies } from "../repositories/store.repository.js";
import { NotFoundError } from "../errors.js";

// 가게 상세 정보 조회
export const getStore = async (storeId) => {
  const store = await getStoreById(storeId);
  
  if (!store) {
    throw new NotFoundError("존재하지 않는 가게입니다.", { storeId });
  }
  
  return store;
};

// 가게 리뷰 목록 조회
export const getStoreReviewList = async (storeId, cursor, limit) => {
  // 가게 존재 여부 확인
  console.log("서비스에 전달된 가게 ID:", storeId); // 디버깅용
  
  const store = await getStoreById(storeId);
  
  if (!store) {
    throw new NotFoundError("존재하지 않는 가게입니다.", { storeId });
  }
  
  // 리뷰 목록 조회
  const reviewsData = await getStoreReviews(storeId, cursor, limit);
  
  return {
    store_name: store.name,
    reviews: reviewsData.reviews,
    pagination: {
      nextCursor: reviewsData.nextCursor,
      hasNextPage: reviewsData.hasNextPage
    }
  };
};

// 리뷰 이미지 조회 (함수 틀만 구현)
export const getReviewImageList = async (reviewId) => {
  const images = await getReviewImages(reviewId);
  return images;
};

// 리뷰 답글 조회 (함수 틀만 구현)
export const getReviewReplyList = async (reviewId) => {
  const replies = await getReviewReplies(reviewId);
  return replies;
};