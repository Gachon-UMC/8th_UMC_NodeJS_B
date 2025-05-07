import { pool, prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const addChallenge = async (data) => {
    console.log(data.missionId);
    console.log(data.userId);
    const created = await prisma.user_mission.create({
        data: {
            user_id: data.userId,
            mission_id: data.missionId,
            status: "created",
        },
    });
    console.log("created", created.id);
    return created.id;
};

export const getFirstChallenge = async (userId) => {
    const firstChallenge = await prisma.user_mission.findFirst({
        where: { id: userId },
    });
    const convertedFirstChallenge = convertBigIntToString(firstChallenge);
    return convertedFirstChallenge;
};
