import express from 'express';
import { handleAddMission } from '../controllers/mission.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { handleGetStoreMissions } from '../controllers/mission.controller.js';


const router = express.Router();

// 가게에 미션 추가 API - 테스트용으로 인증 미들웨어 제거 가능
router.post('/:storeId/missions', authenticateUser, handleAddMission);
router.get('/:storeId/missions',authenticateUser, handleGetStoreMissions);

export default router;