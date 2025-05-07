import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); 

  const storeId = req.params.storeId;
  const userId = req.user?.id || 1; // test용으로 user_id = 1 임시 허용

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }

  const review = await addReview(
    bodyToReview({
        ...req.body,
        user_id: userId, 
        store_id: storeId
    })
);
  res.status(StatusCodes.OK).json({result: review});

};