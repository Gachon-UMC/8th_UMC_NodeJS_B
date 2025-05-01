import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { addReviewStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleUserSignUp = async (req, res) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddReview = async (req, res) => {
    console.log("리뷰 작성 요청했습니다.");
    const storeId = req.params.storeid;
    console.log(storeId);
    console.log(req.body);
    const review = await addReviewStore(
        bodyToReview({ ...req.body, store_id: storeId })
    );

    res.status(StatusCodes.OK).json({ result: review });
};
