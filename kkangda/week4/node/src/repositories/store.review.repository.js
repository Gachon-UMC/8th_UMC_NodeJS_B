import { pool } from "../db.config.js";

// review 데이터 삽입
export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
            data.store_id
        );

        if (!confirm[0].isExistStore) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO review (member_id, store_id, star_rating, content) VALUES (?, ?, ?, ?);`,
            [data.member_id, data.store_id, data.star_rating, data.content]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// review 정보 얻기
export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

        console.log(review);

        if (review.length == 0) {
            return null;
        }

        return review[0];
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
