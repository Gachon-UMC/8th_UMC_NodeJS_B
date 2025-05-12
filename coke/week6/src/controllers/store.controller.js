import { StatusCodes } from "http-status-codes";
import { getStore, getStoreReviewList, getReviewImageList, getReviewReplyList } from "../services/store.service.js";

// 가게 상세 정보 조회
export const handleGetStore = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    const store = await getStore(storeId);
    // res.status(StatusCodes.OK).json({ result: store }); // 이전 코드
    return res.status(StatusCodes.OK).success(store); // 수정된 코드
  } catch (error) {
    console.error("가게 정보 조회 오류:", error);
    
    // 이 부분은 서비스 레이어로 이동해야 함 (오류 처리는 서비스에서)
    next(error);
  }
};

// 가게 리뷰 목록 조회 (커서 기반 페이징)
export const handleGetStoreReviews = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { cursor, limit = 5 } = req.query;
    
    const result = await getStoreReviewList(storeId, cursor, parseInt(limit));
    // res.status(StatusCodes.OK).json({ result }); // 이전 코드
    return res.status(StatusCodes.OK).success(result); // 수정된 코드
  } catch (error) {
    console.error("가게 리뷰 목록 조회 오류:", error);
    
    // 이 부분은 서비스 레이어로 이동해야 함 (오류 처리는 서비스에서)
    next(error);
  }
};

// 리뷰 이미지 조회 (함수 틀만 구현)
export const handleGetReviewImages = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    
    const images = await getReviewImageList(reviewId);
    // res.status(StatusCodes.OK).json({ result: images }); // 이전 코드
    return res.status(StatusCodes.OK).success(images); // 수정된 코드
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
    // res.status(StatusCodes.OK).json({ result: replies }); // 이전 코드
    return res.status(StatusCodes.OK).success(replies); // 수정된 코드
  } catch (error) {
    console.error("리뷰 답글 조회 오류:", error);
    next(error);
  }
};