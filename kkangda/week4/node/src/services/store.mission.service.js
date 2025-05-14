import { responseFromMission } from "../dtos/store.mission.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import { addMission, getMission } from "../repositories/store.mission.repository.js";

export const storeMission = async (data) => {
    const missionId = await addMission({
        storeId: data.storeId,
        content: data.content,
        deadline: data.deadline,
        reward: data.reward,
    });

    if (missionId === null) {
        throw new DuplicateUserEmailError("가게가 존재하지 않습니다.", data);
    }

    const mission = await getMission(missionId);
    console.log(mission);
    return responseFromMission(mission);
};
