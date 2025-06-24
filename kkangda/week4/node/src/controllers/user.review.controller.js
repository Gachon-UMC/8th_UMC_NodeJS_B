import { StatusCodes } from "http-status-codes";
import { listUserReviews } from "../services/user.review.service.js";

export const handleListUserReviews = async (req, res, next) => {
    /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    
    #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    schema: { type: 'number' },
    description: '커서'
    }

    #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    schema: { type: 'number' },
    description: '사용자 ID'
    }

    #swagger.responses[200] = {
    description: "내가 작성한 리뷰 목록 조회 성공 응답",
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
                        content: { type: "string" },
                        store_name: { type: "string" },
                        star_rating: { type: "number" },
                        created_at: { type: "string", format: "date-time"}
                    }
                    }
                },
                pagination: {
                    type: "object",
                    properties: {
                    cursor: { type: "number", nullable: true }
                    }
                }
                }
            }
            }
        }
        }
    }
    }

    #swagger.responses[404] = {
      description: "내가 작성한 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                       userId: { type: "number" },
                       cursor: { type: "number" }
                    }
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

    const reviews = await listUserReviews(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};
