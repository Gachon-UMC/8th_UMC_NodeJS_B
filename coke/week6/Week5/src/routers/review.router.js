import express from 'express';
import { handleAddReview } from '../controllers/review.controller.js';

const router = express.Router();

// 리뷰 추가 API - 인증 미들웨어는 굳이 추가 안했음
router.post('/:placeId/reviews', handleAddReview);

export default router;