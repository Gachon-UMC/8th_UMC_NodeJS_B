import { prisma } from "../../db.config.js";

export const updateMissionStatus = async (userId, missionId) => {
    console.log(userId, missionId);
    const mission = await prisma.user_mission.updateMany({
        where: { user_id: userId, mission_id: missionId },
        data: { status: "completed" },
    });
    console.log(mission);
    return mission;
};
