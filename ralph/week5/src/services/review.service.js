import { responseFromReview } from "../dtos/review.dto.js";
import { addReview } from "./repositories/review.repository.js";
import { pool } from "../db.config.js";

export const addReviewStore = async (data) => {
    const addReviewId = await addReview({
        user_id: data.user_id,
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
    });
    const [rows] = await pool.query(`SELECT * FROM review WHERE id = ?`, [
        addReviewId,
    ]);
    const insertedReview = rows[0];
    console.log(insertedReview);
    return responseFromReview(insertedReview);
};
