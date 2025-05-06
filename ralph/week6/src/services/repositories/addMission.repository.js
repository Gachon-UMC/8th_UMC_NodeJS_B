import { pool } from "../../db.config.js";
export const addMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [confirm] = await pool.query(
            "SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) AS isExistStore",
            [data.store_id]
        );

        if (!confirm[0].isExistStore) {
            return null;
        }
        const [result] = await pool.query(
            `INSERT INTO mission (status,content,point,store_id,end_date ) VALUES (?, ?, ?,?, ?);`,
            [
                data.status,
                data.content,
                data.point,
                data.store_id,
                data.end_date,
            ]
        );
        console.log(result.insertId);
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
