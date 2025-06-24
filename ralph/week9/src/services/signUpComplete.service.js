import { updateUserDate } from "./repositories/signUpComplete.repository.js";

export const signUpComplete = async (userId, data) => {
    const user = await updateUserDate(userId, data);
    return user;
};
