import { pool, prisma } from "../../db.config.js";

// User 데이터 삽입
export const addUser = async ({ data }) => {

    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
  
    if (user) {
        return null;
    }
  
    const created = await prisma.user.create({
        data: {
            name: data.name,
            password: data.password,
            email: data.email,
            birth: data.birth,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            address: data.address,
            myPoint: data.myPoint,
        },
    });
    return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [user] = await pool.query(
            `SELECT * FROM user WHERE id = ?;`,
            userId
        );

        console.log(user);

        if (user.length == 0) {
            return null;
        }

        return user;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection();

    try {
        await pool.query(
            `INSERT INTO user_category (user_id,category_id ) VALUES (?, ?);`,
            [userId, foodCategoryId]
        );

        return;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [preferences] = await pool.query(
            "SELECT ufc.id, ufc.category_id, ufc.user_id, fcl.kind " +
                "FROM user_category ufc JOIN category fcl on ufc.category_id = fcl.id " +
                "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;",
            userId
        );

        return preferences;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
