import { pool } from "../db.config.js";

export const addMissionToDB = async (data) => {
    const conn = await pool.getConnection();

    const createdAt = new Date();
    const updatedAt = new Date();

    try{
        const [confirm] = await conn.query('SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) AS isExistStore', [data.store_id]);
        
        if(!confirm[0].isExistStore){
            return null;
        }
        console.log('들어옴');
        console.log(data.store_id);

        const [result] = await conn.query('INSERT INTO mission (title, content, point, created_at, updated_at, deadline, store_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            data.title,
            data.content,
            data.point,
            createdAt,
            updatedAt,
            data.deadline,
            data.store_id
        ])
        return result.insertId

    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}

export const getMissionFromDB = async (missionId) => {
    const conn = await pool.getConnection();

    try{
        const [mission] = await conn.query('SELECT * FROM mission where id = ?',[missionId]);

        console.log(mission);

        if(mission.length ==0 ){
            return null;
        }
        return mission;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}

export const updateMissionToDB = async (data) => {
    const conn = await pool.getConnection();

    const createdAt = new Date();
    const completedAt = new Date();
    const basicStatus = 1;

    try {
        // do_mission 테이블에 mission_id가 있는지 확인
        const [isInDoMission] = await conn.query(
            'SELECT id FROM do_mission WHERE mission_id = ?',
            [data.mission_id]
        );

        if (isInDoMission.length === 0) {
            // mission 존재 여부 확인
            const [isInMission] = await conn.query(
                'SELECT id FROM mission WHERE id = ?',
                [data.mission_id]
            );

            if (isInMission.length === 0) {
                throw new Error('존재하지 않는 미션입니다.');
            }

            // do_mission에 새로 삽입
            const [result] = await conn.query(
                'INSERT INTO do_mission (created_at, status, completed_at, user_id, mission_id) VALUES (?, ?, ?, ?, ?)',
                [createdAt, basicStatus, completedAt, data.user_id, data.mission_id]
            );

            return data.mission_id; 
        }

        else{
            // 이미 도전중인지 확인 
            const [isAlreadyDo] = await conn.query(
                'SELECT EXISTS (SELECT 1 FROM do_mission WHERE user_id = ? AND mission_id = ? AND status = ?) AS isChallenging',
                [data.user_id, data.mission_id, data.status]
            );
            console.log(isAlreadyDo);

            if (isAlreadyDo[0].isChallenging === 1) {
                throw new Error('이미 도전중인 미션입니다.');
            }

            console.log('user_id:', data.user_id);
            console.log('mission_id:', data.mission_id);
            console.log('status:', data.status, typeof data.status);

            // 이미 도전중 X -> 도전중으로 변경 
            const [results] = await conn.query(
                'UPDATE do_mission SET status = ? WHERE user_id = ? AND mission_id = ?',
                [data.status, data.user_id, data.mission_id]
            );

            if (results.affectedRows === 0) {
                throw new Error('업데이트된 행이 없습니다.');
            }

            return data.mission_id; 
        }
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
    } finally {
        conn.release();
    }
};