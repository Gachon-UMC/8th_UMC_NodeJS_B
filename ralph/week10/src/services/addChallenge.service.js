import {
    addChallenge,
    findChallenge,
    findMission,
} from "./repositories/addChallenge.repository.js";
import { responseFromAddChallenge } from "../dtos/addChallenge.dto.js";
import {
    ConflictStoreIdMissonIdError,
    NotFoundStoreMissionError,
} from "../error.js";
export const addChallengeMission = async (data) => {
    const missionId = await findMission({
        missionId: data.missionId,
    });
    console.log(missionId);
    if (missionId === null) {
        throw new NotFoundStoreMissionError("해당 미션이 없습니다.", {
            missionId: data.missionId,
        });
    }
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
    console.log("challengeId", challengeId);
    const addMission = await findChallenge(challengeId.id);
    return responseFromAddChallenge(addMission);
};
