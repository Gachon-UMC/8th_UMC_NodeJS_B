import { storeMission } from "../services/repositories/getStoreMission.repository.js";
import { responseFromGetStoreMission } from "../dtos/getStoreMission.dto.js";
import { NotFoundStoreMissionError } from "../error.js";
export const getStoreMission = async (storeId, cursor) => {
    const data = await storeMission(storeId, cursor);
    if (data.length === 0) {
        throw new NotFoundStoreMissionError(
            "해당 가게의 미션이 없습니다.",
            data
        );
    }
    return responseFromGetStoreMission(data);
};
