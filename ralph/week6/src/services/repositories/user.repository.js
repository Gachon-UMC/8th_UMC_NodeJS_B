import { pool, prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
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
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return null;
    }
    return Number(user.id);
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    // const findUserId = await prisma.user_category.findFirst({
    //     where: {
    //         user_id: userId,
    //     },
    // });
    // if (findUserId) {
    //     const patchUserCategory = await prisma.user_category.update({
    //         where: {
    //             user_id: userId,
    //         },
    //         data: {
    //             user_id: userId,
    //             category_id: foodCategoryId,
    //         },
    //     });
    //     return patchUserCategory.id;
    // } else {
    console.log(foodCategoryId);
    const userPreference = await prisma.user_category.create({
        data: {
            user_id: userId,
            category_id: foodCategoryId,
        },
    });
    console.log("userPreference", userPreference);
    if (!userPreference) {
        return null;
    }
    return userPreference.id;
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    // const conn = await pool.getConnection();
    const preferences = await prisma.user_category.findMany({
        where: { user_id: userId },
        select: {
            id: true,
            category_id: true,
            user_id: true,
            category: {
                select: {
                    kind: true,
                },
            },
        },
    });
    // try {
    //     const [preferences] = await pool.query(
    //         "SELECT ufc.id, ufc.category_id, ufc.user_id, fcl.kind " +
    //             "FROM user_category ufc JOIN category fcl on ufc.category_id = fcl.id " +
    //             "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;",
    //         userId
    //     );
    //     console.log("preferences", preferences);
    //     return preferences;
    // } catch (err) {
    //     throw new Error(
    //         `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    //     );
    // } finally {
    //     conn.release();
    // }
    const convertPreferences = convertBigIntToString(preferences);
    return convertPreferences;
};
