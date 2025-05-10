import { pool, prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
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
export const getFirstMission = async (missionId) => {
    console.log("missionId", missionId);
    const firstMission = await prisma.mission.findFirst({
        where: {
            id: missionId,
        },
    });
    const convertedMission = convertBigIntToString(firstMission);
    return convertedMission;
};
