import { responseFromMission } from "../dtos/mission.dto.js";

import {
    addMissionToDB,
    getMissionFromDB,
    updateMissionToDB,
} from "../repositories/mission.repository.js";


export const addMission = async (data) =>{
    console.log(data);
    
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


export const modifyMission = async (data) => {
    
    const updatedMissionId = await updateMissionToDB(data);
    if(updatedMissionId == null){
        throw new Error("해당 미션을 찾을 수 없습니다.");
    }

    return responseFromMission({mission_id : updatedMissionId});
}