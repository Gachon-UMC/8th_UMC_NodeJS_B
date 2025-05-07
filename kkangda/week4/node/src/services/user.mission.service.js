import { responseFromUserMission } from "../dtos/user.mission.dto.js";
import { addUserMission, getUserMission } from "../repositories/user.mission.repository.js";

export const userMission = async (data) => {
    const userMissionId = await addUserMission({
        member_id: data.member_id,
        mission_id: data.mission_id,
        is_finished: data.is_finished,
    });

    if (userMissionId === null) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    const result = await getUserMission(userMissionId);

    return responseFromUserMission(result[0]);
};
