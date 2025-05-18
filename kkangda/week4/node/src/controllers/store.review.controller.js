import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/store.review.dto.js";
import { storeReview } from "../services/store.review.service.js";

export const handleStoreReview = async (req, res, next) => {
    /*
    #swagger.summary = '가게에 리뷰 추가하기 API'

    #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'number' },
    description: '가게 ID'
    }

    #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
        schema: {
            type: "object",
            properties: {
            starRating: { type: "number" },
            content: { type: "string" }
            }
        }
        }
    }
    }

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
                data: {
                    type: "array",
                    items: {
                    type: "object",
                    properties: {
                        star_rating: { type: "number" },
                        content: { type: "string" }
                    }
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
    description: "가게에 리뷰 추가하기 실패 응답",
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
                    storeId: { type: "number" },
                    starRating: { type: "number" },
                    content: { type: "string" }
                    }
                }
                }
            },
            success: { type: "object", nullable: true, example: null }
            }
        }
        }
    }
    }
    */

    console.log("리뷰 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const review = await storeReview(bodyToReview(req.body, parseInt(req.params.storeId)));
    res.status(StatusCodes.OK).success(review);
};
