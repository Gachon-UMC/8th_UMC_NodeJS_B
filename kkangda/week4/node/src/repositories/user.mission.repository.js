import { prisma } from "../db.config.js";

// user mission 데이터 삽입
export const addUserMission = async (data) => {
    const mission = await prisma.userMission.findFirst({
        where: { userId: data.userId, missionId: data.missionId, isFinished: data.isFinished },
    });

    // 이미 도전 중인 미션인지 검증
    if (mission) {
        return null;
    }

    const created = await prisma.userMission.create({ data: data });
    return created.id;
};

// user mission 정보 얻기
export const getUserMission = async (userMissionId) => {
    const userMission = await prisma.userMission.findFirstOrThrow({ where: { id: userMissionId } });
    const mission = await prisma.mission.findFirstOrThrow({ where: { id: userMission.missionId } });
    const missionContent = mission.content;
    return missionContent;
};
