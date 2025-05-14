import { StatusCodes } from "http-status-codes";
import { listUserReviews } from "../services/user.review.service.js";

export const handleListUserReviews = async (req, res, next) => {
    const reviews = await listUserReviews(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};
