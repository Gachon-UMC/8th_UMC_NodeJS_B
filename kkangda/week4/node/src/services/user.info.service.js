import { responseFromUser } from "../dtos/user.info.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
    patchUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    deletePreference,
} from "../repositories/user.info.repository.js";

export const userInfo = async (data) => {
    // id와 preferences 따로 빼기
    const { id, preferences, ...newData } = data;
    // null 또는 undefined인 항목 제거
    const filteredData = Object.fromEntries(Object.entries(newData).filter(([_, value]) => value != null));

    const joinUserId = await patchUser(id, filteredData);

    if (joinUserId === null) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다. 수정이 불가능합니다.", filteredData);
    }

    if (preferences) {
        await deletePreference(joinUserId);
        for (const p of preferences) {
            await setPreference(joinUserId, p);
        }
    }

    const user = await getUser(joinUserId);
    const convertedPreferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser(user, convertedPreferences);
};
