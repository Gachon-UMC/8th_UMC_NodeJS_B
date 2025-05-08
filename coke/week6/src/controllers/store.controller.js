import { StatusCodes } from "http-status-codes";
import { getStore, getStoreReviewList, getReviewImageList, getReviewReplyList } from "../services/store.service.js";

// 가게 상세 정보 조회
export const handleGetStore = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    const store = await getStore(storeId);
    res.status(StatusCodes.OK).json({ result: store });
  } catch (error) {
    console.error("가게 정보 조회 오류:", error);
    
    if (error.message === "존재하지 않는 가게입니다.") {
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
    
    next(error);
  }
};

// 가게 리뷰 목록 조회 (커서 기반 페이징)
export const handleGetStoreReviews = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { cursor, limit = 5 } = req.query;
    
    const result = await getStoreReviewList(storeId, cursor, parseInt(limit));
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.error("가게 리뷰 목록 조회 오류:", error);
    
    if (error.message === "존재하지 않는 가게입니다.") {
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
    
    next(error);
  }
};

// 리뷰 이미지 조회 (함수 틀만 구현)
export const handleGetReviewImages = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    
    const images = await getReviewImageList(reviewId);
    res.status(StatusCodes.OK).json({ result: images });
  } catch (error) {
    console.error("리뷰 이미지 조회 오류:", error);
    next(error);
  }
};

// 리뷰 답글 조회 (함수 틀만 구현)
export const handleGetReviewReplies = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    
    const replies = await getReviewReplyList(reviewId);
    res.status(StatusCodes.OK).json({ result: replies });
  } catch (error) {
    console.error("리뷰 답글 조회 오류:", error);
    next(error);
  }
};