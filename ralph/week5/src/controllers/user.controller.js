import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { addChallengeMission } from "../services/addChallenge.service.js";
import { bodyToAddChallenge } from "../dtos/addChallenge.dto.js";



import { bodyToAddMission } from "../dtos/addMission.dto.js";
import { addMissionStore } from "../services/addMission.service.js";

import { addReviewStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";



export const handleUserSignUp = async (req, res) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};


export const handleAddChallenge = async (req, res) => {
    console.log("미션 도전하기를 요청했습니다.");
    console.log(req.body);
    const missionId = req.params.missionId;
    // const userId = req.user.id;  // 이렇게 하면
    const userId = Math.floor(Math.random() * 20) + 1; // userId 를 모르기 임의로 id 가 생성되도록 함
    // 이렇게 안하면 userId 와 movieId 가 기존에 DB 에 있는거랑 중복되어서 오류가 발생

    const patchMission = await addChallengeMission(
        bodyToAddChallenge({ missionId, userId })
    );
    res.status(StatusCodes.OK).json({ result: patchMission });


export const handleAddMission = async (req, res) => {
    const storeId = req.params.storeid;
    console.log("미션 추가 요청했습니다.");
    // console.log(req.body);
    const mission = await addMissionStore(
        bodyToAddMission({ ...req.body, store_id: storeId })
    );
    // console.log(mission);
    res.status(StatusCodes.OK).json({ result: mission });

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
