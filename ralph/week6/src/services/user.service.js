import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
} from "./repositories/user.repository.js";

export const userSignUp = async (data) => {
    // console.log(data);
    console.log(data.gender);
    const joinUserId = await addUser({
        data: {
            name: data.name,
            password: data.password,
            email: data.email,
            birth: data.birth,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            address: data.address,
            myPoint: data.myPoint,
            preferences: data.preferences,
        },
    });
    console.log("joinUserId", joinUserId);
    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);
    console.log(user);
    console.log(preferences);
    return responseFromUser({ user, preferences });
};
