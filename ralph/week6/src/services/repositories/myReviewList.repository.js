import { prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const getMyReviewList = async (userId, cursor) => {
    console.log("userId2", userId);
    const data = await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            review_point: true,
            created_at: true,
            store: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            user_id: userId,
        },
        orderBy: { id: "asc" },
        take: 5,
    });
    const reviewList = convertBigIntToString(data);
    return reviewList;
};
