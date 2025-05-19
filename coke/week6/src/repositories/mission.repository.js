import { prisma } from "../db.config.js";

export const createMission = async (missionData) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        store: {
          connect: { id: parseInt(missionData.store_id) }
        },
        title: missionData.title,
        description: missionData.description,
        reward_points: missionData.reward_points,
        start_date: new Date(missionData.start_date),
        end_date: new Date(missionData.end_date),
        type: missionData.type,
        is_active: Boolean(missionData.is_active),
        difficulty_level: missionData.difficulty_level
      }
    });
    
    return mission.id;
  } catch (err) {
    throw new Error(`미션 등록 중 오류가 발생했습니다. (${err})`);
  }
};

export const getMissionById = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: parseInt(missionId) }
    });
    
    return mission;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다. (${err})`);
  }
};