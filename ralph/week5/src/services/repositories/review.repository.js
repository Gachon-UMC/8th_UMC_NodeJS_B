import { pool } from "../../db.config.js";
export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
            [data.store_id]
        );

        if (!confirm[0].isExistStore) {
            return null; // 존재하지 않는 store에는 리뷰 등록 불가
        }

        const [result] = await pool.query(
            `INSERT INTO review (user_id, store_id, review_point, content) VALUES (?, ?, ?, ?);`,
            [data.user_id, data.store_id, data.review_point, data.content]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
