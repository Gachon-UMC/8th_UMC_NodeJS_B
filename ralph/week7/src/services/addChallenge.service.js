import {
    addChallenge,
    findChallenge,
} from "./repositories/addChallenge.repository.js";
import { responseFromAddChallenge } from "../dtos/addChallenge.dto.js";
import { ConflictStoreIdMissonIdError } from "../error.js";
export const addChallengeMission = async (data) => {
    const challengeId = await addChallenge({
        missionId: data.missionId,
        userId: data.userId,
    });

    if (challengeId === null) {
        throw new ConflictStoreIdMissonIdError(
            "이미 존재하는 user_mission입니다.",
            data
        );
    }

    const addMission = await findChallenge(challengeId);
    return responseFromAddChallenge(addMission);
};
