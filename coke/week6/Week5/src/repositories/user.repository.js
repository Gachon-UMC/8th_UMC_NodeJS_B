import { pool } from "../db.config.js";

// 사용자 추가
export const addUser = async (userData) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO USER (
        username, email, password_hash, created_at, 
        last_login, is_active, phone_number, social_login_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        userData.username,
        userData.email,
        userData.password_hash,
        userData.created_at,
        null, // last_login
        userData.is_active,
        userData.phone_number,
        userData.social_login_type
      ]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`사용자 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 이메일로 사용자 조회
export const getUserByEmail = async (email) => {
  const conn = await pool.getConnection();
  
  try {
    const [users] = await conn.query(
      `SELECT * FROM USER WHERE email = ?;`,
      [email]
    );
    
    if (users.length === 0) {
      return null;
    }
    
    return users[0];
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// ID로 사용자 조회
export const getUserById = async (userId) => {
  const conn = await pool.getConnection();
  
  try {
    const [users] = await conn.query(
      `SELECT * FROM USER WHERE id = ?;`,
      [userId]
    );
    
    if (users.length === 0) {
      return null;
    }
    
    return users[0];
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 카테고리 선호도 설정
export const setUserCategoryPreference = async (userId, categoryId) => {
  const conn = await pool.getConnection();
  
  try {
    await conn.query(
      `INSERT INTO USER_CATEGORY_PREFERENCE (
        user_id, category_id, created_at
      ) VALUES (?, ?, NOW());`,
      [userId, categoryId]
    );
  } catch (err) {
    throw new Error(`카테고리 선호도 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();
  
  try {
    const [preferences] = await conn.query(
      `SELECT ucp.id, ucp.category_id, c.name
       FROM USER_CATEGORY_PREFERENCE ucp 
       JOIN CATEGORY c ON ucp.category_id = c.id
       WHERE ucp.user_id = ?;`,
      [userId]
    );
    
    return preferences;
  } catch (err) {
    throw new Error(`사용자 선호 카테고리 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};