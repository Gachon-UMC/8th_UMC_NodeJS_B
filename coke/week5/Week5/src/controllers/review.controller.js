import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    const { placeId } = req.params; // storeId와 동일 의미로 가정
    // 실제 구현에서는 인증된 사용자 ID 사용
    // 테스트용으로 임시 ID 사용
    const userId = req.user?.id || 1;

    // 현재 날짜/시간을 ISO 문자열로 생성
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    
    const reviewData = {
      ...req.body,
      user_id: userId,
      store_id: placeId,
      created_at: new Date(),
      updated_at: new Date(),
      is_verified: false,
      helpful_count: 0
    };
    
    const review = await addReview(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error("리뷰 추가 오류:", error);
    next(error);
  }
};