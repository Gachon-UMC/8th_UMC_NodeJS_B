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
export const getUserOngoingMissions = async (userId) => {
  try {
    const userMissions = await prisma.userMission.findMany({
      where: {
        user_id: parseInt(userId),
        status: '진행중'
      },
      include: {
        mission: {
          select: {
            title: true,
            reward_points: true,
            store: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        assigned_date: 'desc'
      }
    });
    
    return userMissions.map(userMission => ({
      id: userMission.id,
      mission_id: userMission.mission_id,
      title: userMission.mission.title,
      reward_points: userMission.mission.reward_points,
      store_name: userMission.mission.store.name,
      assigned_date: userMission.assigned_date,
      status: userMission.status
    }));
  } catch (err) {
    throw new Error(`사용자 진행 중인 미션 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// 미션 상태 변경 (진행 중 -> 완료)
export const completeMission = async (userMissionId, proofImage) => {
  try {
    // 1. 미션 상태 업데이트
    const userMission = await prisma.userMission.update({
      where: { id: parseInt(userMissionId) },
      data: {
        status: '완료',
        completed_date: new Date(),
        proof_image: proofImage
      },
      include: {
        mission: {
          select: {
            reward_points: true
          }
        },
        user: {
          select: {
            id: true
          }
        }
      }
    });
    
    // 2. 포인트 지급
    if (userMission.mission.reward_points > 0) {
      await prisma.userPoint.create({
        data: {
          user_id: userMission.user.id,
          amount: userMission.mission.reward_points,
          type: '미션 완료',
          description: `미션 ID: ${userMission.mission_id} 완료 보상`,
          created_at: new Date(),
          mission_id: userMission.mission_id
        }
      });
      
      // 3. 사용자 프로필 포인트 업데이트
      await prisma.userProfile.updateMany({
        where: { user_id: userMission.user.id },
        data: {
          total_points: {
            increment: userMission.mission.reward_points
          }
        }
      });
    }
    
    return {
      id: userMission.id,
      status: '완료',
      completed_date: userMission.completed_date,
      reward_points: userMission.mission.reward_points
    };
  } catch (err) {
    throw new Error(`미션 완료 처리 중 오류가 발생했습니다. (${err})`);
  }
};

// 미션 상태 변경
export const toggleMissionStatus = async (userMissionId, newStatus) => {
  try {
    // 상태 값 검증
    if (!['진행중', '진행완료', '완료'].includes(newStatus)) {
      throw new Error('유효하지 않은 상태 값입니다.');
    }
    
    // 미션 상태 업데이트
    const userMission = await prisma.userMission.update({
      where: { id: parseInt(userMissionId) },
      data: {
        status: newStatus,
        completed_date: newStatus === '진행중' ? null : new Date()
      }
    });
    
    return {
      id: userMission.id,
      status: userMission.status,
      completed_date: userMission.completed_date
    };
  } catch (err) {
    throw new Error(`미션 상태 변경 중 오류가 발생했습니다. (${err})`);
  }
};