import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { addChallengeMission } from "../services/addChallenge.service.js";
import { bodyToAddChallenge } from "../dtos/addChallenge.dto.js";
import { bodyToAddMission } from "../dtos/addMission.dto.js";
import { addMissionStore } from "../services/addMission.service.js";
import { addReviewStore } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

import { MyReviewList } from "../services/MyReviewList.service.js";

import { getStoreMission } from "../services/getStoreMission.service.js";


import { getMyOngoingMission } from "../services/getMyOngoingMission.service.js";

import { updateMission } from "../services/updateMission.service.js";

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
};

export const handleAddMission = async (req, res) => {
    const storeId = req.params.storeid;
    console.log("미션 추가 요청했습니다.");
    // console.log(req.body);
    const mission = await addMissionStore(
        bodyToAddMission({ ...req.body, store_id: storeId })
    );
    // console.log(mission);
    res.status(StatusCodes.OK).json({ result: mission });
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


export const handleMyReviewList = async (req, res) => {
    console.log("내 리뷰 목록 요청했습니다.");
    const userId = req.params.userId;
    console.log(typeof req.query.cursor);
    const reviewList = await MyReviewList(
        parseInt(userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: reviewList });


export const handleGetStoreMission = async (req, res) => {
    console.log(`${req.params.storeId}의 미션을 조회하셨습니다.`);
    const storeId = req.params.storeId;
    const cursor = req.query.cursor;
    const mission = await getStoreMission(
        storeId,
        typeof cursor === "string" ? parseInt(cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: mission });


export const handleGetMyOngoingMission = async (req, res) => {
    console.log("내 미션 조회 요청했습니다.");
    const userId = req.params.userId;
    const cursor = req.query.cursor;
    console.log("userId", userId, cursor);
    const onGoingMission = await getMyOngoingMission(
        parseInt(userId),
        typeof cursor === "string" ? parseInt(cursor) : 0
    );
    res.status(StatusCodes.OK).json({ result: onGoingMission });

export const handleUpdateMission = async (req, res) => {
    console.log("미션 업데이트 요청했습니다.");
    const userId = req.params.userId;
    const missionId = req.params.missionId;
    const mission = await updateMission(userId, missionId);
    res.status(StatusCodes.OK).json({ result: mission });


};
