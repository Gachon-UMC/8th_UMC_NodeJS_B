import { prisma } from "../db.config.js";

export const createUserMission = async (participationData) => {
  try {
    const userMission = await prisma.userMission.create({
      data: {
        user: {
          connect: { id: parseInt(participationData.user_id) }
        },
        mission: {
          connect: { id: parseInt(participationData.mission_id) }
        },
        assigned_date: new Date(participationData.assigned_date),
        status: participationData.status,
        proof_image: participationData.proof_image
      }
    });
    
    return userMission.id;
  } catch (err) {
    throw new Error(`미션 참여 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserMissionById = async (userMissionId) => {
  try {
    const userMission = await prisma.userMission.findUnique({
      where: { id: parseInt(userMissionId) }
    });
    
    return userMission;
  } catch (err) {
    throw new Error(`사용자 미션 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserMissionByUserAndMission = async (userId, missionId) => {
  try {
    const userMission = await prisma.userMission.findFirst({
      where: {
        user_id: parseInt(userId),
        mission_id: parseInt(missionId),
        status: {
          not: '완료'
        }
      }
    });
    
    return userMission;
  } catch (err) {
    throw new Error(`사용자 미션 조회 중 오류가 발생했습니다. (${err})`);
  }
};