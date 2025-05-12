import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/store.review.dto.js";
import { storeReview } from "../services/store.review.service.js";

export const handleStoreReview = async (req, res, next) => {
    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const review = await storeReview(bodyToReview(req.body, parseInt(req.params.storeId)));
    console.log(review);
    res.status(StatusCodes.OK).json({ result: review });
};
