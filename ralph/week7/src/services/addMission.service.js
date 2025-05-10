import { responseToAddMission } from "../dtos/addMission.dto.js";
import { pool } from "../db.config.js";
import {
    addMission,
    getFirstMission,
} from "./repositories/addMission.repository.js";
export const addMissionStore = async (data) => {
    console.log("data1", data);
    const addMissionId = await addMission({
        status: data.status,
        content: data.content,
        point: data.point,
        store_id: data.store_id,
        end_date: data.end_date,
    });
    // console.log(addMissionId);
    const addMissionItem = await getFirstMission(addMissionId);
    // console.log(rows[0]);
    console.log("a", addMissionItem);
    // console.log(insertedReview);
    return responseToAddMission(addMissionItem);
};
