import express from 'express';
import { handleAddMission, handleParticipateMission,  } from '../controllers/mission.controller.js';
import { handleUpdateMissionStatus, handleGetUserOngoingMissions,  } from '../controllers/mission.controller.js';
import { authenticateUser,  } from '../middlewares/auth.middleware.js';


const router = express.Router();

// 미션 도전 API
router.post('/:missionId/participate', authenticateUser, handleParticipateMission);
// 사용자의 진행 중인 미션 목록 조회
router.get('/ongoing', authenticateUser, handleGetUserOngoingMissions);
// 미션 상태 업데이트
router.patch('/:missionId/status', authenticateUser, handleUpdateMissionStatus);

export default router;