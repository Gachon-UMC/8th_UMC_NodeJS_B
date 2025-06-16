import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError, NoModifyData, NotExistUserId } from "../errors.js";

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  modifyUser
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phone: data.phone,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const userModify = async (userId, data) => {
  const allowedFields = ["name","email","gender","birth","address","phone"];

  const user = await getUser(userId);
  if (!user) {
    throw new NotExistUserId("존재하지 않는 사용자 ID입니다.", { userId });
  }

  const updates = {};

  for (const field of allowedFields) {
    const value = data[field];
    if (value !== undefined && value !== "") {
      updates[field] = value;
    }
  }

  // 날짜 형식 변환
  if (updates.birth) {
    const parsedDate = new Date(updates.birth);
    if (!isNaN(parsedDate.getTime())) {
      updates.birth = parsedDate;
    } else {
      delete updates.birth;
    }
  }
  console.log("updates:", updates);

  const isModified = allowedFields.some(field => data[field] != undefined);
  if (!isModified) {
    throw new NoModifyData("수정할 데이터가 없습니다.", data);
  }

  const updatedUser = await modifyUser(user.id, updates);

  const preferences = await getUserPreferencesByUserId(user.id);
  return responseFromUser({ user: updatedUser, preferences });
}
