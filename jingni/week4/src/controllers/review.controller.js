import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview, showReviews, showMyReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 작성을 요청했습니다!");
  console.log("body:", req.body); 

  const storeId = req.params.storeId;
  const userId = req.user?.id || 1; // test용으로 user_id = 1 임시 허용

  if (!userId) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }

  const review = await addReview(
    bodyToReview({
        ...req.body,
        user_id: userId, 
        store_id: storeId
    })
);
  res.status(StatusCodes.OK).success(review)

};

export const handleShowReviews = async (req, res, next) => {

  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */

  const storeId = parseInt(req.params.storeId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const reviews = await showReviews(
    storeId, cursor
  );

  res.status(StatusCodes.OK).success(reviews);
};

export const handleMyReviews = async (req, res, next)=>{

  const userId = req.user?.id || 2;
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

  const reviews = await showMyReviews(userId, cursor);

  res.status(StatusCodes.OK).success(reviews)
}

