import { addChallenge } from "./repositories/addChallenge.repository.js";
import { responseFromAddChallenge } from "../dtos/addChallenge.dto.js";
import { pool } from "../db.config.js";
export const addChallengeMission = async (data) => {
    const challengeId = await addChallenge({
        missionId: data.missionId,
        userId: data.userId,
        created_at: new Date(),
    });

    if (challengeId === null) {
        throw new Error("이미 존재하는 user_mission입니다.");
    }
    const [rows] = await pool.query(`SELECT * FROM mission WHERE id = ?`, [
        data.missionId,
    ]);
    const addMission = rows[0];
    return responseFromAddChallenge(addMission);
};
