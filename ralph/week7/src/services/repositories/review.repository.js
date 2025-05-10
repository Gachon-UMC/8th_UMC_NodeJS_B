import { pool } from "../../db.config.js";
import { prisma } from "../../db.config.js";
function convertBigIntToString(obj) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
        )
    );
}
export const addReview = async (data) => {
    console.log("addReview", data);
    const created = await prisma.review.create({
        data: {
            user_id: data.user_id,
            store_id: data.store_id,
            review_point: data.review_point,
            content: data.content,
        },
    });
    return created.id;
};

export const getFirstReview = async (store_id) => {
    const getFirstReview = await prisma.review.findFirst({
        where: {
            id: store_id,
        },
    });
    console.log;
    const convertFirstReview = convertBigIntToString(getFirstReview);
    console.log("getFirstReview", convertFirstReview);
    return convertFirstReview;
};
