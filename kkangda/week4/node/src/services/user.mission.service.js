import { responseFromUserMission } from "../dtos/user.mission.dto.js";
import { addUserMission, getUserMission } from "../repositories/user.mission.repository.js";

export const userMission = async (data) => {
    const userMissionId = await addUserMission({
        member_id: data.member_id,
        mission_id: data.mission_id,
        is_finished: data.is_finished,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser(user[0], preferences);
};
