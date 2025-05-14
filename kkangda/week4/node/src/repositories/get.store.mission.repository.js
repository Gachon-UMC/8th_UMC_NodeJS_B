import { prisma } from "../db.config.js";

export const getAllStoreMission = async (storeId, cursor) => {
    const missions = await prisma.mission.findMany({
        select: { id: true, content: true, deadline: true, reward: true },
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });

    if (missions.length === 0) {
        return null;
    }

    return missions;
};
