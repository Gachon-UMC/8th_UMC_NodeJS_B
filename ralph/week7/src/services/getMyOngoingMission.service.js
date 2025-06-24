import { MyOngoingMission } from "./repositories/getMyOngoingMission.repository.js";
import { responseToOngoingMission } from "../dtos/myOngoingMission.dto.js";
import { NotFoundMyOngoingMissionError } from "../error.js";
export const getMyOngoingMission = async (userId, cursor) => {
    const data = await MyOngoingMission(userId, cursor);
    if (data.length === 0) {
        throw new NotFoundMyOngoingMissionError(
            "현재 진행중인 미션이 없습니다.",
            data
        );
    }
    return responseToOngoingMission(data);
};
