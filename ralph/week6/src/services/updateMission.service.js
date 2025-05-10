import { updateMissionStatus } from "./repositories/updateMission.repository.js";
export const updateMission = async (userId, missionId) => {
    const mission = await updateMissionStatus(userId, missionId);
    return mission;
};
