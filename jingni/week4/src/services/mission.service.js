import { responseFromMission } from "../dtos/mission.dto.js";

import {
    addMissionToDB,
    getMissionFromDB
} from "../repositories/mission.repository.js";


export const addMission = async (data) =>{
    const newMissionId = await addMissionToDB ({
        title: data.title,
        content: data.content,
        point: data.point,
        deadline: data.deadline,
        store_id: data.store_id
    });

    if(newMissionId == null){
        throw new Error("존재하지 않는 가게 ID 입니다.");
    }

    const mission = await getMissionFromDB(newMissionId);

    return responseFromMission(mission[0]);
}