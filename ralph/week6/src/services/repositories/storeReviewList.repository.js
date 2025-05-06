import { prisma } from "../../db.config.js";

export const getReviewLista = async (storeId) => {
    console.log(storeId);
    const getData = await prisma.review.findMany({
        select: {
            id: true,
            user_id: true,
            store_id: true,
            review_point: true,
            content: true,
        },
        where: { store_id: storeId },
        orderBy: { id: "asc" },
        take: 5,
    });
    console.log(getData);
    return getData;
};
