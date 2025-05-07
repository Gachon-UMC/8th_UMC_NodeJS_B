import { pool } from "../db.config.js";

// user mission 데이터 삽입
export const addUserMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM member_mission WHERE member_id = ? and mission_id = ? and is_finished = 0) as isAlreadyChallenging;`,
            [data.member_id, data.mission_id]
        );

        // 이미 도전 중인 미션인지 검증
        if (confirm[0].isAlreadyChallenging) {
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO member_mission (member_id, mission_id, is_finished) VALUES (?, ?, ?);`,
            [data.member_id, data.mission_id, data.is_finished]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// user mission 정보 얻기
export const getUserMission = async (userMissionId) => {
    const conn = await pool.getConnection();

    try {
        const [userMission] = await pool.query(`SELECT * FROM member_mission WHERE id = ?;`, userMissionId);

        console.log(userMission);

        if (userMission.length == 0) {
            return null;
        }

        const [missionContent] = await pool.query(
            `SELECT content FROM mission WHERE id = ?;`,
            userMission[0].mission_id
        );

        console.log(missionContent);

        return missionContent;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
