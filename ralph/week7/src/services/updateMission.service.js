import { updateMissionStatus } from "./repositories/updateMission.repository.js";
import { NotFoundUserMissionError } from "../error.js";
export const updateMission = async (userId, missionId) => {
    const mission = await updateMissionStatus(userId, missionId);
    if (mission.count === 0) {
        throw new NotFoundUserMissionError(
            "해당 미션 정보가 없거나 이미 처리되었습니다.",
            {
                userId,
                missionId,
            }
        );
    }

    return mission;
};
