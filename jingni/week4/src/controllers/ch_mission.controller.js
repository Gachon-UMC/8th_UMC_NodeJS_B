import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/ch_mission.dto.js";
import { modifyMission } from "../services/ch_mission.service.js"

export const handleUpdateMission = async (req,res, next) => {
    console.log("미션 도전하기를 요청했습니다 !");
    console.log("body: ",req.body);

    const missionId = req.params.missionId;
    const userId = req.user?.id || 2;

    if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
    }

    const updatedMission = await modifyMission(
        bodyToMission(
            {...req.body,
            mission_id: missionId,
            user_id:userId
        })
    )
    res.status(StatusCodes.OK).json({result : updatedMission})
}