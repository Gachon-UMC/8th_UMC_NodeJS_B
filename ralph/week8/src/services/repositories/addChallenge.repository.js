import { convertBigIntToString } from "../../convertType.js";
import { prisma } from "../../db.config.js";
export const findMission = async (data) => {
    console.log(data);
    const mission = await prisma.mission.findFirst({
        where: {
            id: data.missionId,
        },
    });
    if (mission === null) {
        return null;
    } else {
        return mission.id;
    }
};
export const addChallenge = async (data) => {
    try {
        const challengeId = await prisma.user_mission.create({
            data: {
                user_id: data.userId,
                mission_id: data.missionId,
                status: "onGoing",
            },
        });
        console.log(challengeId);
        return challengeId;
    } catch (err) {
        if (err.code === "P2002") {
            return null;
        }
    }
};

export const findChallenge = async (challengeId) => {
    console.log("challengeId", challengeId);
    const challenge = await prisma.user_mission.findFirst({
        where: {
            id: challengeId,
        },
    });
    console.log("challenge", challenge);
    const convertChallenge = convertBigIntToString(challenge);
    return convertChallenge;
};
