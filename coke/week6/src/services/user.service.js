import { addUser, getUserByEmail, getUserById } from "../repositories/user.repository.js";
import { setUserCategoryPreference, getUserPreferencesByUserId } from "../repositories/user.repository.js";
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errorCode.js";

export const userSignUp = async (userData) => {
  // 이메일 중복 확인
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {

    //기존 오류코드:
    //throw new Error("이미 존재하는 이메일입니다.");
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", userData);
  }
  
  // 테스트 환경에서는 간단하게 비밀번호 처리
  const passwordHash = userData.password + "_hashed"; // 단순히 접미사 추가 (테스트용)
  
  // 사용자 정보 저장
  const userId = await addUser({
    username: userData.username,
    email: userData.email,
    password_hash: passwordHash,
    created_at: userData.created_at,
    is_active: userData.is_active,
    phone_number: userData.phone_number,
    social_login_type: userData.social_login_type
  });
  
  // 사용자 카테고리 선호도 저장
  if (userData.preferences && userData.preferences.length > 0) {
    for (const categoryId of userData.preferences) {
      await setUserCategoryPreference(userId, categoryId);
    }
  }
  
  // 저장된 사용자 정보 조회
  const user = await getUserById(userId);
  const preferences = await getUserPreferencesByUserId(userId);
  
  return responseFromUser({ user, preferences });
};