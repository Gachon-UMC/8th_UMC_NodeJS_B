import { pool } from "../db.config.js";

// mission 데이터 삽입
export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        // 가게 존재 여부 검증
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) as isExistStore;`,
            data.store_id
        );

        if (!confirm[0].isExistStore) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO mission (store_id, content, deadline, reward) VALUES (?, ?, ?, ?);`,
            [data.store_id, data.content, data.deadline, data.reward]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// mission 정보 얻기
export const getMission = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

        console.log(mission);

        if (mission.length == 0) {
            return null;
        }

        // 가게 이름 얻기
        const [store_name] = await pool.query(`SELECT name FROM store WHERE id = ?`, mission[0].store_id);

        const result = {
            ...mission[0],
            store_name: store_name[0].name,
        };

        return result;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
