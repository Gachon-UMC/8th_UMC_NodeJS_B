import { responseToAddMission } from "../dtos/addMission.dto.js";
import { NotFoundStoreIdError } from "../../src/error.js";
import {
    addMission,
    getFirstMission,
} from "./repositories/addMission.repository.js";
export const addMissionStore = async (data) => {
    console.log("addMissionStore data", data);
    const addMissionId = await addMission({
        data: {
            status: data.status,
            content: data.content,
            point: data.point,
            store_id: data.store_id,
            end_date: data.end_date,
        },
    });
    if (addMissionId === null) {
        throw new NotFoundStoreIdError("해당 가게가 존재하지 않습니다.", data);
    }

    const addMissionItem = await getFirstMission(addMissionId);

    return responseToAddMission(addMissionItem);
};
