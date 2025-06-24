import { prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const MyOngoingMission = async (userId, cursor) => {
    const data = await prisma.user_mission.findMany({
        select: {
            id: true,
            user_id: true,
            mission_id: true,
            mission: {
                select: {
                    id: true,
                    status: true,
                    content: true,
                    point: true,
                    end_date: true,
                },
            },
        },
        where: {
            user_id: userId,
            status: "onGoing",
            id: { gt: cursor },
        },
        orderBy: {
            id: "asc",
        },
        take: 5,
    });
    console.log("data", data);
    const converData = convertBigIntToString(data);
    return converData;
};
