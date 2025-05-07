import {
    addChallenge,
    getFirstChallenge,
} from "./repositories/addChallenge.repository.js";
import { responseFromAddChallenge } from "../dtos/addChallenge.dto.js";
export const addChallengeMission = async (data) => {
    const challengeId = await addChallenge({
        missionId: data.missionId,
        userId: data.userId,
        created_at: new Date(),
    });
    if (challengeId === null) {
        throw new Error("이미 존재하는 user_mission입니다.");
    }
    const firstChallenge = await getFirstChallenge(challengeId);
    return responseFromAddChallenge(firstChallenge);
};
