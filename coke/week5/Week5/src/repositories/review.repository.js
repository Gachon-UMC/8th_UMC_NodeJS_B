import { pool } from "../db.config.js";

export const createReview = async (reviewData) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO REVIEW (
        user_id, mission_id, store_id, rating, content, 
        created_at, updated_at, is_verified, helpful_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
      [
        reviewData.user_id,
        reviewData.mission_id, // mission_id를 정확히 전달
        reviewData.store_id,
        reviewData.rating,
        reviewData.content, // 리뷰 내용을 content 컬럼에 저장
        reviewData.created_at, // 날짜 정보를 created_at 컬럼에 저장
        reviewData.updated_at, // 날짜 정보를 updated_at 컬럼에 저장
        reviewData.is_verified,
        reviewData.helpful_count
      ]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getReviewById = async (reviewId) => {
  const conn = await pool.getConnection();
  
  try {
    const [review] = await conn.query(
      `SELECT * FROM REVIEW WHERE id = ?;`,
      [reviewId]
    );
    
    if (review.length === 0) {
      return null;
    }
    
    return review[0];
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};