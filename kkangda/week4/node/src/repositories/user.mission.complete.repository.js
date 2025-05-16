import { prisma } from "../db.config.js";
import { ExceptionError } from "../errors.js";

export const updateUserMission = async (data) => {
    try {
        const userMission = await prisma.userMission.findFirstOrThrow({
            where: {
                userId: data.userId,
                missionId: data.missionId,
                isFinished: 0,
            },
        });

        const updated = await prisma.userMission.update({
            where: { id: userMission.id },
            data: { isFinished: 1 },
        });

        return updated;
    } catch (error) {
        throw new ExceptionError("예외 발생", data);
    }
};

export const getUserMission = async (updated) => {
    const completedmissions = await prisma.userMission.findMany({
        where: {
            userId: updated.userId,
            isFinished: 1,
        },
    });

    // missionId만 배열로 추출
    const missionIds = completedmissions.map((mission) => mission.missionId);

    const missions = await prisma.mission.findMany({
        select: { id: true, store: true, content: true, reward: true },
        where: {
            id: { in: missionIds },
        },
    });

    return missions;
};
