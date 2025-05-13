import { prisma } from "../db.config.js";
import { IsChallenging, NotChallenging, NotExistStoreId } from "../errors.js";

export const addMissionToDB = async (data) => {

    const store = await prisma.store.findFirst({where: {id: data.store_id}})

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

export const getStoreMissionFromDB = async (storeId, cursor) => {

    const store = await prisma.store.findFirst({where: {id: storeId}})

    if(!store){
       throw new NotExistStoreId("존재하지 않는 가게 ID 입니다. ", {storeId})
    }

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

export const updateMissionToDB = async (data) => {

    const isDoingStatus = 1;
    const isCompletedStatus = 2;

    if(data.status ==1){
        const doMission = await prisma.doMission.findFirst({where: {missionId: data.mission_id}})
        if(!doMission){
            const mission = await getMissionFromDB(data.mission_id);
            if (!mission) {
                return null; 
            }
            //INSERT do_mission
            const createdDoMission = await prisma.doMission.create({
                data:{
                    //status: 진행 중
                    status: isDoingStatus,
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
                    status: isDoingStatus
                }})

            if(challenging){
                throw new IsChallenging("이미 도전중인 미션입니다.", data);
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
    }else if(data.status == 2){
        const myDoingMission = await prisma.doMission.findFirst({
            where: {
                userId: data.userId,
                missionId: data.mission,
                status: isDoingStatus
            }
        })

        if(!myDoingMission){
            throw new NotChallenging("도전중인 미션이 아닙니다.", data);
        }

        await prisma.doMission.updateMany({
            where: {
                userId: data.user_id,
                missionId: data.mission_id
            },
            data: {
                status: isCompletedStatus,
                //completed_at: new Date()
            }
        });

        return data.mission_id
    }
};
