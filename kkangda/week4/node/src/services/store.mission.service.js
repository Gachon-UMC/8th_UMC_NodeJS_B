import { responseFromMission } from "../dtos/store.mission.dto.js";
import { addMission, getMission } from "../repositories/store.mission.repository.js";

export const storeMission = async (data) => {
    const missionId = await addMission({
        store_id: data.store_id,
        content: data.content,
        deadline: data.deadline,
        reward: data.reward,
    });

    const mission = await getMission(missionId);

    return responseFromMission(mission);
};
