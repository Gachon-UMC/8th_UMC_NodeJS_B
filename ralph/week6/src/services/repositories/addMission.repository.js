import { pool, prisma } from "../../db.config.js";
export const addMission = async (data) => {
    const endDate = new Date(data.end_date);
    const addMission = await prisma.mission.create({
        data: {
            status: data.status,
            content: data.content,
            point: data.point,
            store_id: data.store_id,
            end_date: endDate,
        },
    });
    return addMission.id;
};
