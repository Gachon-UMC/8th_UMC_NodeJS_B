import { responseFromMissions } from "../dtos/get.store.mission.dto.js";
import { NotFoundStoreIdOrCusorError } from "../errors.js";
import { getAllStoreMission } from "../repositories/get.store.mission.repository.js";

export const listStoreMission = async (storeId, cursor) => {
    const missions = await getAllStoreMission(storeId, cursor);

    if (missions === null) {
        throw new NotFoundStoreIdOrCusorError("store ID가 일치하지 않거나 cursor가 올바르지 않습니다.", {
            storeId,
            cursor,
        });
    }

    return responseFromMissions(missions);
};
