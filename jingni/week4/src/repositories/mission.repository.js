import { prisma } from "../db.config.js";

export const addMissionToDB = async (data) => {

    const store = prisma.store.findFirst({where: {id: data.store_id}})

    if(!store){
        return null;
    }

    const created = await prisma.mission.create({
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
    return created.id
}

export const getMissionFromDB = async (missionId) => {

    const mission = await prisma.mission.findFirst({where: {id: missionId}})
    if(!mission){
        return null;
    }

    return mission;
}

export const updateMissionToDB = async (data) => {

    const basicStatus = 1;

    const doMission = await prisma.doMission.findFirst({where: {missionId: data.mission_id}})
    if(!doMission){
        //INSERT do_mission
        const createdDoMission = await prisma.doMission.create({
            data:{
                //status: 진행 중
                status: basicStatus,
                user: {
                    connect: {id : data.user_id}
                },
                mission: {
                    connect: {id : data.mission_id}
                }
            }
        })

        return createdDoMission.id;
    }else{

        const challenging = await prisma.doMission.findFirst({
            where: {
                userId: data.user_id,
                missionId: data.mission_id,
                status: 1
            }})

        if(challenging){
            throw new Error('이미 도전중인 미션입니다.');
        }
        
        await prisma.doMission.updateMany({
            where: {
                userId: data.user_id,
                missionId: data.mission_id
            },
            data: {
                status: data.status
            }
        });

        return data.mission_id
    }
};