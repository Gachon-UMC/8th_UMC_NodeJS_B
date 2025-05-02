import { pool } from "../../db.config.js";
export const addChallenge = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM user_mission WHERE mission_id = ? AND user_id =? ) as isExistEmail;`,
            [data.missionId, data.userId]
        );

        if (confirm[0].isExistChallenge) {
            return null;
        }

        const [result] = await conn.query(
            `INSERT INTO user_mission (user_id,mission_id,created_at ) VALUES (?, ?, ?);`,
            [data.userId, data.missionId, data.created_at]
        );
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
