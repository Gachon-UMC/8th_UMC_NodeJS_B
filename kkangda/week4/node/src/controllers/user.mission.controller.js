import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user.mission.dto.js";
import { userMission } from "../services/user.mission.service.js";

export const handleUserMission = async (req, res, next) => {
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const result = await userMission(bodyToUserMission(req.body, parseInt(req.params.userId)));
    res.status(StatusCodes.OK).json({ result: result });
};
