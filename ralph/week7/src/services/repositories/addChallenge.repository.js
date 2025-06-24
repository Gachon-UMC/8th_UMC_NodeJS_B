import { convertBigIntToString } from "../../convertType.js";
import { prisma } from "../../db.config.js";

export const addChallenge = async (data) => {
    try {
        const challengeId = await prisma.user_mission.create({
            data: {
                user_id: data.userId,
                mission_id: data.missionId,
                status: "onGoing",
            },
        });
        return challengeId;
    } catch (err) {
        if (err.code === "P2002") {
            return null;
        }
    }
};

export const findChallenge = async ({ challengeId }) => {
    const challenge = await prisma.user_mission.findFirst({
        where: {
            id: challengeId,
        },
    });
    const convertChallenge = convertBigIntToString(challenge);
    return convertChallenge;
};
