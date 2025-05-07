import { pool } from "../db.config.js";

export const addMissionToDB = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [confirm] = await conn.query('SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) AS isExistStore', [data.store_id]);
        
        if(!confirm[0].isExistStore){
            return null;
        }

        const [result] = await conn.query('INSERT INTO mission (title, content, point, deadline, store_id) VALUES (?, ?, ?, ?, ?)', [
            data.title,
            data.content,
            data.point,
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