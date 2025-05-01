import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
} from "./repositories/user.repository.js";

export const userSignUp = async (data) => {
    const joinUserId = await addUser({
        name: data.name,
        password: data.password,
        email: data.email,
        birth: data.birth,
        phone_number: data.phone_number,
        gender: data.gender,
        address: data.address,
        birth: data.birth,
        my_point: data.my_point,
        preferences: data.preferences,
    });

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
