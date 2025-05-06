import { pool, prisma } from "../../db.config.js";
export const addChallenge = async (data) => {
    console.log(data.missionId);
    console.log(data.userId);
    const created = await prisma.user_mission.create({
        data: {
            user_id: data.userId,
            mission_id: data.missionId,
        },
    });
    console.log("created", created.id);
    return created.id;
};
