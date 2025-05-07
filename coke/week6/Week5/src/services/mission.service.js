import { createMission, getMissionById } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { createUserMission, getUserMissionById, getUserMissionByUserAndMission } from "../repositories/userMission.repository.js";

// 미션 추가 기능
export const addMission = async (missionData) => {
  // 가게가 존재하는지 검증
  const store = await getStoreById(missionData.store_id);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const missionId = await createMission(missionData);
  const mission = await getMissionById(missionId);
  
  return mission;
};

// 미션 도전하기 기능
export const participateMission = async (participationData) => {
  // 미션이 존재하는지 검증
  const mission = await getMissionById(participationData.mission_id);
  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }
  
  // 미션이 활성화되어 있는지 검증
  if (!mission.is_active) {
    throw new Error("비활성화된 미션입니다.");
  }
  
  // 미션 기간이 유효한지 검증
  const currentDate = new Date();
  const startDate = new Date(mission.start_date);
  const endDate = new Date(mission.end_date);
  
  if (currentDate < startDate) {
    throw new Error("아직 시작되지 않은 미션입니다.");
  }
  
  if (currentDate > endDate) {
    throw new Error("이미 종료된 미션입니다.");
  }
  
  // 이미 도전 중인 미션인지 검증
  const existingUserMission = await getUserMissionByUserAndMission(
    participationData.user_id, 
    participationData.mission_id
  );
  
  if (existingUserMission) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  
  // 미션 도전 정보 저장
  const userMissionId = await createUserMission(participationData);
  const userMission = await getUserMissionById(userMissionId);
  
  return userMission;
};