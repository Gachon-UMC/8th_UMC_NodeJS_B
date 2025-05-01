import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/store.mission.dto.js";
import { storeMission } from "../services/store.mission.service.js";

export const handleStoreMission = async (req, res, next) => {
    console.log("미션 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const mission = await storeMission(bodyToMission(req.body));
    console.log(mission);
    res.status(StatusCodes.OK).json({ result: mission });
};
