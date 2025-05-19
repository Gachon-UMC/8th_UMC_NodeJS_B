import express from 'express';
import { handleAddMission, handleParticipateMission } from '../controllers/mission.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

// 미션 도전 API
router.post('/:missionId/participate', authenticateUser, handleParticipateMission);

export default router;