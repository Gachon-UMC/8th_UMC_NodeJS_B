import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
      return null;
    }

    const created = await prisma.user.create({ 
      data: {
        username: data.username,
        email: data.email,
        password_hash: data.password_hash,
        created_at: data.created_at,
        is_active: data.is_active,
        phone_number: data.phone_number,
        social_login_type: data.social_login_type
      } 
    });
    return created.id;
  } catch (err) {
    throw new Error(`사용자 등록 중 오류가 발생했습니다. (${err})`);
  }
};

// 이메일로 사용자 조회
export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({ 
      where: { email: email } 
    });
    return user;
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// ID로 사용자 조회
export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findFirst({ 
      where: { id: parseInt(userId) } 
    });
    return user;
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// 사용자 카테고리 선호도 설정
export const setUserCategoryPreference = async (userId, categoryId) => {
  try {
    await prisma.userCategoryPreference.create({
      data: {
        user: {
          connect: { id: parseInt(userId) }
        },
        category: {
          connect: { id: parseInt(categoryId) }
        },
        created_at: new Date()
      }
    });
  } catch (err) {
    throw new Error(`카테고리 선호도 등록 중 오류가 발생했습니다. (${err})`);
  }
};

export const getUserPreferencesByUserId = async (userId) => {
  try {
    const preferences = await prisma.userCategoryPreference.findMany({
      select: {
        id: true,
        user_id: true,
        category_id: true,
        category: true
      },
      where: { 
        user_id: parseInt(userId)
      },
      orderBy: { 
        category_id: "asc"
      }
    });
    
    return preferences;
  } catch (err) {
    throw new Error(`사용자 선호 카테고리 조회 중 오류가 발생했습니다. (${err})`);
  }
};