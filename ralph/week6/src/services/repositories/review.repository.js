import { pool } from "../../db.config.js";
import { prisma } from "../../db.config.js";
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
