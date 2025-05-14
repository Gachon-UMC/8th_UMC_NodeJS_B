import { prisma } from "../db.config.js";

// review 데이터 삽입
export const addReview = async (data) => {
    console.log(data.storeId);
    const store = await prisma.store.findFirst({ where: { id: data.storeId } });

    // 가게 존재 여부 검증
    if (!store) {
        return null;
    }

    const created = await prisma.userStoreReview.create({ data: data });
    return created.id;
};

// review 정보 얻기
export const getReview = async (reviewId) => {
    // mission 정보 얻기
    const review = await prisma.userStoreReview.findFirstOrThrow({ where: { id: reviewId } });

    return review;
};
