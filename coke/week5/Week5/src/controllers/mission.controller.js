import { StatusCodes } from "http-status-codes";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    
    // 현재 날짜/시간을 ISO 문자열로 생성
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const missionData = {
      ...req.body,
      store_id: storeId,
      // 필수 필드 누락 시 기본값 설정
      start_date: req.body.start_date || currentDate,
      end_date: req.body.end_date || currentDate,
      is_active: req.body.is_active !== undefined ? req.body.is_active : 1,
      difficulty_level: req.body.difficulty_level || 1
    };
    
    const mission = await addMission(missionData);
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    console.error("미션 추가 오류:", error);
    next(error);
  }
};