import { prisma } from "../db.config.js";

// mission 데이터 삽입
export const addMission = async (data) => {
    const store = await prisma.store.findFirst({ where: { id: data.storeId } });

    // 가게 존재 여부 검증
    if (!store) {
        return null;
    }

    const created = await prisma.mission.create({ data: data });
    return created.id;
};

export const getMission = async (missionId) => {
    // mission 정보 얻기
    const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
    // 가게 이름 얻기
    const store = await prisma.store.findFirstOrThrow({ where: { id: mission.storeId } });
    const storeName = store.name;
    const result = { ...mission, storeName };

    return result;
};
