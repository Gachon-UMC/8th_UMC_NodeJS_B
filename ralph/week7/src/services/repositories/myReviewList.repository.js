import { prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const getMyReviewList = async (userId, cursor) => {
    console.log("userId", userId, cursor);
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
            id: { gt: cursor },
        },
        orderBy: { id: "asc" },
        take: 5,
    });
    console.log("data", data);
    const reviewList = convertBigIntToString(data);
    return reviewList;
};
