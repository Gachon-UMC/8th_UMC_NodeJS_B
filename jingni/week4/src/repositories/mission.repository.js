import { prisma } from "../db.config.js";

export const getMissionFromDB = async (missionId) => {

    const mission = await prisma.mission.findFirst({where: {id: missionId}})
    if(!mission){
        return null;
    }

    return mission;
}

export const getStoreFromDB = async (storeId) => {

    const store = await prisma.store.findFirst({where: {id: storeId}})

    if(!store){
       return null;
    }
    return store;
}

export const getStoreMissionsFromDB = async ( storeId, cursor) =>{

    const missions = await prisma.mission.findMany({
            select:{
                id: true,
                title: true,
                content: true,
                point: true,
                deadline: true,
                storeId: true,
                store: true,
                doMission: true
            },
            where:{
                storeId: storeId,
                id: {
                    gt: cursor
                }
            },
            orderBy: { id: "asc" },
            take: 5,
    });

    if(missions.length ==0){
        return null;
    }
    
    return missions;
}

export const getDoMissionFromDB = async (missionId) => {
    const doMission = await prisma.doMission.findFirst({
        where: {missionId: missionId}
    })

    if(!doMission){
        return null;
    }

    return doMission;
}

export const checkStatusFromDB = async (data, updatedStatus) => {

   const challenging = await prisma.doMission.findFirst({
                where: {
                    userId: data.user_id,
                    missionId: data.mission_id,
                    status: updatedStatus
                }})

    if(challenging){
        return true;
    }else{
        return false;
    }

}

export const addMissionToDB = async (data) => {

    const newMission = await prisma.mission.create({
        data:{
            title: data.title,
            content: data.content,
            point: data.point,
            deadline: data.deadline,

            store: {
                connect: { id: data.store_id }
            }
        }
    });
    
    return newMission.id;
}

export const addDoMissionToDB = async (data) => {
    const newDoMission = await prisma.doMission.create({
        data:{
            status: 1,
            user: {
                connect: {id : data.user_id}
            },
            mission: {
                connect: {id : data.mission_id}
            }
        }
    })

    return newDoMission.id;
}

export const updateMissionToDB = async (data, status) =>{

    await prisma.doMission.updateMany({
                where: {
                    userId: data.user_id,
                    missionId: data.mission_id
                },
                data: {
                    status: status
                }
    });

    return data.mission_id
}