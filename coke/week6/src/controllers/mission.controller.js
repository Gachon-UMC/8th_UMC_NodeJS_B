import { StatusCodes } from "http-status-codes";
import { addMission, participateMission } from "../services/mission.service.js";
import { getUserOngoingMissions, completeMission, toggleMissionStatus } from "../repositories/userMission.repository.js";
import { getUserMissionByUserAndMission } from "../repositories/userMission.repository.js";

// 가게에 미션 추가 기능
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

// 미션 도전하기 기능
export const handleParticipateMission = async (req, res, next) => {
  try {
    const { missionId } = req.params;
    // 실제 구현에서는 인증된 사용자 ID 사용
    // 테스트용으로 임시 ID 사용
    const userId = req.user?.id || 1;
    
    // 추가 데이터 처리 (예: 증명 이미지)
    const participationData = {
      user_id: userId,
      mission_id: missionId,
      proof_image: req.body.proof_image || null,
      assigned_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: '진행중'
    };
    
    const userMission = await participateMission(participationData);
    res.status(StatusCodes.CREATED).json({ 
      message: "미션 도전이 성공적으로 등록되었습니다.",
      result: userMission 
    });
  } catch (error) {
    console.error("미션 참여 오류:", error);
    
    // 특정 오류 메시지에 대한 상태 코드 처리
    if (error.message === "존재하지 않는 미션입니다.") {
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    } else if (error.message === "이미 도전 중인 미션입니다.") {
      return res.status(StatusCodes.CONFLICT).json({ message: error.message });
    }
    
    next(error);
  }
};

export const handleGetUserOngoingMissions = async (req, res, next) => {
  try {
    // 인증된 사용자 ID 사용 (또는 테스트용 ID)
    const userId = req.user?.id || 1;
    
    const missions = await getUserOngoingMissions(userId);
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    console.error("진행 중인 미션 목록 조회 오류:", error);
    next(error);
  }
};

// 미션 상태 변경
export const handleUpdateMissionStatus = async (req, res, next) => {
  try {
    const { missionId } = req.params;
    const { status, proof_image } = req.body;
    
    // 인증된 사용자 ID 사용 (또는 테스트용 ID)
    const userId = req.user?.id || 1;
    
    // 먼저 사용자의 미션인지 확인
    const userMission = await getUserMissionByUserAndMission(userId, missionId);
    
    if (!userMission) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        message: "해당 미션을 찾을 수 없거나 접근 권한이 없습니다." 
      });
    }
    
    // 상태 변경
    let result;
    if (status === '완료') {
      result = await completeMission(userMission.id, proof_image);
    } else {
      result = await toggleMissionStatus(userMission.id, status);
    }
    
    res.status(StatusCodes.OK).json({ 
      message: "미션 상태가 성공적으로 변경되었습니다.",
      result: result
    });
  } catch (error) {
    console.error("미션 상태 변경 오류:", error);
    next(error);
  }
};