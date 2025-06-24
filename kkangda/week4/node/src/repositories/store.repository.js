import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor) => {
    const reviews = await prisma.userStoreReview.findMany({
        select: { id: true, content: true, store: true, user: true },
        where: { storeId: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });

    if (reviews.length === 0) {
        return null;
    }

    return reviews;
};
