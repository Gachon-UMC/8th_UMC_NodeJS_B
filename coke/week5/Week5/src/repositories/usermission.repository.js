import { pool } from "../db.config.js";

// 미션 도전 정보 생성
export const createUserMission = async (participationData) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO USER_MISSION (
        user_id, mission_id, assigned_date, status, proof_image
      ) VALUES (?, ?, ?, ?, ?);`,
      [
        participationData.user_id,
        participationData.mission_id,
        participationData.assigned_date,
        participationData.status,
        participationData.proof_image
      ]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 참여 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 미션 조회
export const getUserMissionById = async (userMissionId) => {
  const conn = await pool.getConnection();
  
  try {
    const [userMission] = await conn.query(
      `SELECT * FROM USER_MISSION WHERE id = ?;`,
      [userMissionId]
    );
    
    if (userMission.length === 0) {
      return null;
    }
    
    return userMission[0];
  } catch (err) {
    throw new Error(`사용자 미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자별 미션 조회 (도전 중인지 확인용)
export const getUserMissionByUserAndMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  
  try {
    const [userMission] = await conn.query(
      `SELECT * FROM USER_MISSION 
       WHERE user_id = ? AND mission_id = ? AND status != '완료';`,
      [userId, missionId]
    );
    
    if (userMission.length === 0) {
      return null;
    }
    
    return userMission[0];
  } catch (err) {
    throw new Error(`사용자 미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};