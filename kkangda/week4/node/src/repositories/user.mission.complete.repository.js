import { prisma } from "../db.config.js";

export const updateUserMission = async (data) => {
    try {
        const userMission = await prisma.userMission.findFirstOrThrow({
            where: {
                userId: data.userId,
                missionId: data.missionId,
            },
        });

        const updated = await prisma.userMission.update({
            where: { id: userMission.id },
            data: { isFinished: 1 },
        });

        return updated.id;
    } catch (error) {
        throw error;
    }
};

export const getUserMission = async (id) => {
    const userMission = await prisma.userMission.findFirstOrThrow({ where: { id: id } });
    return userMission;
};
