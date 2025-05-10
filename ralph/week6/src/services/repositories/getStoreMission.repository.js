import { prisma } from "../../db.config.js";

function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const storeMission = async (storeId, cursor) => {
    const mission = await prisma.mission.findMany({
        select: {
            id: true,
            content: true,
            end_date: true,
            point: true,
            status: true,
            store: { select: { id: true, name: true } },
        },
        where: {
            store_id: storeId,
            id: { gt: cursor },
        },
        orderBy: {
            id: "asc",
        },
        take: 5,
    });
    const converData = convertBigIntToString(mission);
    return converData;
};
