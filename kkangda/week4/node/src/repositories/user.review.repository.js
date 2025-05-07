import { prisma } from "../db.config.js";

export const getAllUserReviews = async (userId, cursor) => {
    const reviews = await prisma.userStoreReview.findMany({
        select: { id: true, content: true, store: true, user: true },
        where: { userId: userId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });

    return reviews;
};
