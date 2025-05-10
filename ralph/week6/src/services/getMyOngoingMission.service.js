import { MyOngoingMission } from "./repositories/getMyOngoingMission.repository.js";
import { responseToOngoingMission } from "../dtos/myOngoingMission.dto.js";
export const getMyOngoingMission = async (userId, cursor) => {
    console.log("userId", userId, cursor);
    const data = await MyOngoingMission(userId, cursor);
    return responseToOngoingMission(data);
};
