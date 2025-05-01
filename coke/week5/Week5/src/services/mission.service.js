import { createMission, getMissionById } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

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