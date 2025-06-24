import { prisma } from "../db.config.js";

// User 데이터 수정
export const patchUser = async (id, data) => {
    let user = null;

    if (data.email) {
        user = await prisma.user.findFirst({ where: { email: data.email } });
    }

    if (user) {
        return null;
    }
    console.log(data);
    const updated = await prisma.user.update({
        where: {
            id: id,
        },
        data: data,
    });

    return updated.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
    return user;
};

// 기존 음식 선호 카테고리 삭제
export const deletePreference = async (userId) => {
    await prisma.foodPreference.deleteMany({
        where: {
            userId: userId,
        },
    });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    await prisma.foodPreference.create({
        data: {
            userId: userId,
            foodCategoryId: foodCategoryId,
        },
    });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    const preferences = await prisma.foodPreference.findMany({
        select: {
            id: true,
            userId: true,
            foodCategoryId: true,
            foodCategory: true,
        },
        where: { userId: userId },
        orderBy: { foodCategoryId: "asc" },
    });

    return preferences;
};
