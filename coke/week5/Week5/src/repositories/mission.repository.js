import { pool } from "../db.config.js";

export const createMission = async (missionData) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO MISSION (
        store_id, title, description, reward_points, 
        start_date, end_date, type, is_active, difficulty_level
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        missionData.store_id,
        missionData.title,
        missionData.description || null,
        missionData.reward_points,
        missionData.start_date,
        missionData.end_date,
        missionData.type || null,
        missionData.is_active || true,
        missionData.difficulty_level || 1
      ]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId) => {
  const conn = await pool.getConnection();
  
  try {
    const [mission] = await conn.query(
      `SELECT * FROM MISSION WHERE id = ?;`,
      [missionId]
    );
    
    if (mission.length === 0) {
      return null;
    }
    
    return mission[0];
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};