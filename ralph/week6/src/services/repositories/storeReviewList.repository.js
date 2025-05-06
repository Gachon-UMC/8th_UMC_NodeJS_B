import { prisma } from "../../db.config.js";

function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}

export const getReviewList = async (storeId, cursor) => {
    // console.log(storeId);
    const getData = await prisma.review.findMany({
        select: {
            id: true,
            store_id: true,
            review_point: true,
            content: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: { store_id: storeId, id: { gt: cursor } },
        orderBy: { id: "asc" },
        take: 5,
    });
    const safe = convertBigIntToString(getData);
    // console.log(safe);
    return safe;
};
