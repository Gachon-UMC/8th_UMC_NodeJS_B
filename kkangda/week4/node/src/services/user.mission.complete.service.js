import { responseFromUserMission } from "../dtos/user.mission.complete.dto.js";
import { updateUserMission, getUserMission } from "../repositories/user.mission.complete.repository.js";

export const userMissionComplete = async (data) => {
    const updated = await updateUserMission(data);

    const result = await getUserMission(updated);

    return responseFromUserMission(result);
};
