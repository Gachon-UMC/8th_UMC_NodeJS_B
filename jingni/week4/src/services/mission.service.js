import { responseFromMission, responseFromMissionList } from "../dtos/mission.dto.js";
import { NoMissions, NotExistMissionId, NotExistStoreId } from "../errors.js";

import {
    addMissionToDB,
    getMissionFromDB,
    updateMissionToDB,
    getStoreMissionFromDB
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
        throw new NotExistStoreId("존재하지 않는 가게 ID 입니다.", data)
    }

    const mission = await getMissionFromDB(newMissionId);

    return responseFromMission(mission);
}


export const modifyMission = async (data) => {
    
    const updatedMissionId = await updateMissionToDB(data);
    if(updatedMissionId == null){
        throw new NotExistMissionId("존재하지 않는 미션 ID 입니다.", data)
    }

    const mission = getMissionFromDB(updatedMissionId)
    return responseFromMission(mission);
}

export const showStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissionFromDB(storeId, cursor);

    if(missions ===null){
        throw new NoMissions("해당 가게에 미션이 없습니다.", {storeId})
    }
    return responseFromMissionList(missions);
}