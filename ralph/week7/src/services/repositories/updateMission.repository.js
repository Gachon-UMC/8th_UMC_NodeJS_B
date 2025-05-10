import { prisma } from "../../db.config.js";

export const updateMissionStatus = async (userId, missionId) => {
    const mission = await prisma.user_mission.updateMany({
        where: { user_id: userId, mission_id: missionId },
        data: { status: "completed" },
    });
    return mission;
};
