import { pool } from "../db.config.js";

export const updateMission = async (data) => {
    const conn = await pool.getConnection();
    try{
        const [confirm] = await conn.query('SELECT EXISTS (SELECT 1 FROM do_mission WHERE user_id = ? AND mission_id = ? AND status = ?) As isAlreadyChallenging', [
            data.user_id, 
            data.mission_id, 
            data.status
        ])

        console.log("confirm 결과:", confirm);

        if(confirm[0].isAlreadyChallenging){
            return null;
        }

        const [results] = await conn.query('UPDATE do_mission SET status = ? WHERE user_id = ? AND mission_id = ?', [
            data.status,
            data.user_id,
            data.mission_id
        ])

        console.log('update 완료: ',results[0])

        return true;

    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    } finally {
        conn.release();
    }

}

export const getMission = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try{
        const [updatedMission] = await conn.query ('SELECT * FROM do_mission WHERE user_id = ? AND mission_id = ?',
      [userId, missionId])

        console.log(updatedMission);

        if(updatedMission.length === 0){
            return null;
        }

        return updatedMission;

    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    } finally {
        conn.release();
    }
}

