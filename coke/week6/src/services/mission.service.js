import { createMission, getMissionById } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { createUserMission, getUserMissionById, getUserMissionByUserAndMission } from "../repositories/userMission.repository.js";
import { NotFoundError, ConflictError} from "../errors.js";

// 미션 추가 기능
export const addMission = async (missionData) => {
  // 가게가 존재하는지 검증
  const store = await getStoreById(missionData.store_id);
  if (!store) {
    throw new NotFoundError("존재하지 않는 가게입니다.", { storeId: missionData.store_id });
  }

  const missionId = await createMission(missionData);
  const mission = await getMissionById(missionId);
  
  return mission;
};

// 미션 도전하기
export const participateMission = async (participationData) => {

  // 미션이 유무 확인
  const mission = await getMissionById(participationData.mission_id);
  if (!mission) {
    throw new NotFoundError("존재하지 않는 미션입니다.", { missionId: participationData.mission_id });
  }
  
  
  // 이미 도전중인지 확인
  const existingUserMission = await getUserMissionByUserAndMission(
    participationData.user_id, 
    participationData.mission_id
  );
  
  if (existingUserMission) {
    throw new ConflictError("이미 도전 중인 미션입니다.", { 
      userId: participationData.user_id,
      missionId: participationData.mission_id
    });
  }
  
  // 미션 도전 정보 저장
  const userMissionId = await createUserMission(participationData);
  const userMission = await getUserMissionById(userMissionId);
  
  return userMission;
};