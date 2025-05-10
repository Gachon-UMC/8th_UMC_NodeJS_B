import { storeMission } from "../services/repositories/getStoreMission.repository.js";
import { responseFromGetStoreMission } from "../dtos/getStoreMission.dto.js";
export const getStoreMission = async (storeId, cursor) => {
    console.log("storeId1", storeId);
    const data = await storeMission(storeId, cursor);
    return responseFromGetStoreMission(data);
};
