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

export const getStoreMissions = async (storeId) => {
  try {
    const missions = await prisma.mission.findMany({
      where: {
        store_id: parseInt(storeId),
        is_active: true,
        end_date: {
          gte: new Date() // 아직 종료되지 않은 미션만 조회
        }
      },
      orderBy: {
        start_date: 'desc' // 최신 미션부터 정렬
      }
    });
    
    return missions.map(mission => ({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      reward_points: mission.reward_points,
      start_date: mission.start_date,
      end_date: mission.end_date,
      difficulty_level: mission.difficulty_level
    }));
  } catch (err) {
    throw new Error(`가게 미션 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};