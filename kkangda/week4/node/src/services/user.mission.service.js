import { responseFromUserMission } from "../dtos/user.mission.dto.js";
import { AlreadyChallengingError } from "../errors.js";
import { addUserMission, getUserMission } from "../repositories/user.mission.repository.js";

export const userMission = async (data) => {
    const userMissionId = await addUserMission({
        userId: data.userId,
        missionId: data.missionId,
        isFinished: data.isFinished,
    });

    if (userMissionId === null) {
        throw new AlreadyChallengingError("이미 도전 중인 미션입니다.", data);
    }

    const result = await getUserMission(userMissionId);

    return responseFromUserMission(result);
};
