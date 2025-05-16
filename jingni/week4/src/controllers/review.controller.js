import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview, showReviews, showMyReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 리뷰 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              title: { type: "string", example: "좋은 가게" },
              content: { type: "string", example: "서비스가 좋고 맛있어요." },
              rating: { type: "integer", example: 5 },
              user_id: { type: "integer", example: 10 }
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게에 리뷰 추가하기 성공 응답",
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
                  id: { type: "integer" },
                  title: { type: "string" },
                  content: { type: "string" },
                  rating: { type: "integer" },
                  user_id: { type: "integer" },
                  store_id: { type: "integer" }
                },
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "리뷰 추가하기 실패 응답 - 해당 가게가 존재하지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                },
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

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

