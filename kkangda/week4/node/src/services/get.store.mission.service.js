import { responseFromMissions } from "../dtos/get.store.mission.dto.js";
import { getAllStoreMission } from "../repositories/get.store.mission.repository.js";

export const listStoreMission = async (storeId, cursor) => {
    const missions = await getAllStoreMission(storeId, cursor);
    return responseFromMissions(missions);
};
