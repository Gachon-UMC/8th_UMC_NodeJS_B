import { prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const findStore = async (storeId) => {
    const store = await prisma.store.findFirst({
        where: {
            id: storeId,
        },
    });

    return store;
};

export const addMission = async ({ data }) => {
    const store = await findStore(data.store_id);

    if (store === null) {
        return null;
    }

    const endDate = new Date(data.end_date);
    console.log(data);
    const addMission = await prisma.mission.create({
        data: {
            status: data.status,
            content: data.content,
            point: data.point,
            store_id: data.store_id,
            end_date: endDate,
        },
    });

    console.log("addMission", addMission);
    return addMission.id;
};

export const getFirstMission = async (missionId) => {
    const firstMission = await prisma.mission.findFirst({
        where: {
            id: missionId,
        },
    });
    console.log("firstMission", firstMission);
    const convertedMission = convertBigIntToString(firstMission);
    return convertedMission;
};
