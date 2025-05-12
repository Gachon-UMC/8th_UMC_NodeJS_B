import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user.mission.complete.dto.js";
import { userMissionComplete } from "../services/user.mission.complete.service.js";

export const handleUserMissionComplete = async (req, res, next) => {
    const result = await userMissionComplete(bodyToUserMission(parseInt(req.params.userId), req.body));
    res.status(StatusCodes.OK).success(result);
};
