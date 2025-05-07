import { pool } from "../db.config.js";

export const createStore = async (storeData) => {
  const conn = await pool.getConnection();
  
  try {
    const [result] = await conn.query(
      `INSERT INTO STORE (
        region_id, category_id, name, description, address, 
        contact_number, latitude, longitude, business_hours, 
        main_image, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        storeData.region_id,
        storeData.category_id,
        storeData.name,
        storeData.description || null,
        storeData.address,
        storeData.contact_number || null,
        storeData.latitude || null,
        storeData.longitude || null,
        storeData.business_hours || null,
        storeData.main_image || null,
        storeData.is_active || true
      ]
    );
    
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 등록 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  
  try {
    const [store] = await conn.query(
      `SELECT * FROM STORE WHERE id = ?;`,
      [storeId]
    );
    
    if (store.length === 0) {
      return null;
    }
    
    return store[0];
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  } finally {
    conn.release();
  }
};