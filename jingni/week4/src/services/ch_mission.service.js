import { responseFromMission } from "../dtos/ch_mission.dto.js";

import {
    updateMission,
    getMission
} from "../repositories/ch_mission.repository.js"

export const modifyMission = async (data) => {
    const isUpdated = await updateMission({
        status : data.status,
        user_id : data.user_id,
        mission_id : data.mission_id
    })

    if(isUpdated === null){
        throw new Error("이미 도전중인 미션입니다.");
    }

    const updatedMission = await getMission(data.user_id, data.mission_id);
    if(updatedMission == null){
        throw new Error("해당 미션을 찾을 수 없습니다.");
    }

    return responseFromMission(updatedMission[0]);
}