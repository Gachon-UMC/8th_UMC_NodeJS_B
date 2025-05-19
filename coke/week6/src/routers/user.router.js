import express from 'express';
import { handleUserSignUp } from '../controllers/user.controller.js';  // 현재 존재하는 함수만 임포트

const router = express.Router();

// 구현된 라우트만 포함
router.post('/signup', handleUserSignUp);
router.get('/reviews', handleGetUserReviews);

// 아직 구현되지 않은 라우트는 주석 처리
// router.post('/login', handleUserLogin);
// router.get('/profile', authenticateUser, handleGetUserProfile);
console.log('User router loaded with routes:'); // 디버깅용

export default router;