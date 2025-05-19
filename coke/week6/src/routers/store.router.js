import express from 'express';
import { handleAddMission } from '../controllers/mission.controller.js'
import { handleGetStore, handleGetStoreReviews, handleGetReviewImages, handleGetReviewReplies,  } from '../controllers/store.controller.js';

const router = express.Router();

// 가게에 미션 추가 
router.post('/:storeId/missions', handleAddMission);

// 가게 상세 정보 조회
router.get('/:storeId', handleGetStore);

// 가게 리뷰 목록 조회 (커서 기반 페이징)
router.get('/:storeId/reviews', handleGetStoreReviews);

// 리뷰 이미지 조회 (함수 틀만 구현)
router.get('/reviews/:reviewId/images', handleGetReviewImages);

// 리뷰 답글 조회 (함수 틀만 구현)
router.get('/reviews/:reviewId/replies', handleGetReviewReplies);

export default router;