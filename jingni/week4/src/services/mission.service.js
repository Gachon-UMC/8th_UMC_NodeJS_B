import { responseFromMission, responseFromMissionList } from "../dtos/mission.dto.js";
import { StatusError, NoMissions, NotExistMissionId, NotExistStoreId } from "../errors.js";

import {
    addMissionToDB,
    getMissionFromDB,
    updateMissionToDB,
    getStoreMissionsFromDB,
    getStoreFromDB,
    getDoMissionFromDB,
    addDoMissionToDB,
    checkStatusFromDB
} from "../repositories/mission.repository.js";


export const addMission = async (data) =>{
    const store = await getStoreFromDB(data.store_id);
    if(!store){
        throw new NotExistStoreId("존재하지 않는 가게 ID 입니다.", data);
    }
    
    const newMissionId = await addMissionToDB ({
        title: data.title,
        content: data.content,
        point: data.point,
        deadline: data.deadline,
        store_id: data.store_id
    });

    const mission = await getMissionFromDB(newMissionId);

    return responseFromMission(mission);
}

export const challengeMission = async (data) => {
    const updatedStatus = data.status;

    // 미션이 존재하는지 확인
    let mission = await getMissionFromDB(data.mission_id);

    if (!mission) {
        throw new NotExistMissionId("존재하지 않는 미션 ID입니다.", data);
    }

    // doMission에 존재 하는지 확인
    mission = await getDoMissionFromDB(data.mission_id);
    
    if (mission) {
        if (await checkStatusFromDB(data, updatedStatus)) {
            throw new StatusError("이미 도전중인 미션입니다.", data);
        }
        const updatedMissionId = await updateMissionToDB(data, updatedStatus);
        const updatedMission = await getMissionFromDB(updatedMissionId);
        return responseFromMission(updatedMission);
    }

    // doMission에 존재하지 않으면 삽입
    const newDoMissionId = await addDoMissionToDB(data);
    const newDoMission = await getDoMissionFromDB(newDoMissionId);

    return responseFromMission(newDoMission);
}

export const showStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissionsFromDB(storeId, cursor);

    if(!missions){
        throw new NoMissions("해당 가게에 미션이 없습니다.", {storeId})
    }
    return responseFromMissionList(missions);
}

export const completeMission = async (data) => {
    const updatedStatus = data.status;

    let mission = await getMissionFromDB(data.mission_id);
    if(!mission){
        throw new NotExistMissionId("존재하지 않는 미션 ID입니다. ", data);
    }

    mission = await getDoMissionFromDB(data.mission_id);
    if(!mission){
        throw new StatusError("도전중인 미션이 아닙니다.", data);
    }

    if(!await checkStatusFromDB(data, 1)){
        throw new StatusError("도전중인 미션이 아닙니다.", data);
    }

    const completedMissionId = await updateMissionToDB (data, updatedStatus);
    const completedMission = await getMissionFromDB(completedMissionId);

    return responseFromMission(completedMission);
}