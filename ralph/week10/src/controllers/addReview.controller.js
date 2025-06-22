import { addReviewStore } from "../services/addReview.service.js";
import { bodyToReview } from "../dtos/addReview.dto.js";
import { StatusCodes } from "http-status-codes";
export const handleAddReview = async (req, res) => {
    console.log("리뷰 작성 요청했습니다.");
    const storeId = req.params.storeid;
    console.log(storeId);
    console.log(req.body);
    const review = await addReviewStore(
        bodyToReview({ ...req.body, store_id: storeId })
    );
    console.log(review);
    res.status(StatusCodes.OK).success(review);
    /*
    #swagger.summary="가게에 리뷰 추가하기 API"
    #swagger.requestBody={
        required:true,
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        user_id:{type:"number",example:1},
                        review_point:{type:"number",example:5},
                        content:{type:"string",example:"맛있어요"},
                        name:{type:"string",example:"랄프"}
                    }
                }
                
            }
        }
    }
    #swagger.responses[200] = {
    description: "가게 리뷰 추가하기 성공 응답",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    resultType: {
                        type: "string",
                        example: "SUCCESS"},
                    error: {
                        type: "object",
                        nullable: true,
                        example: "null",
                        },
                    success: {
                        type: "object",
                        properties: {
                            id: { type: "number", example: 1 },
                            store_id: { type: "number", example: 1 },
                            review_point: { type: "number", example: 5 },
                            content: {type: "string",example: "맛있어요"},
                            created_at: {type: "string",example: "2025-05-16T17:13:01.000Z"},
                            },
                        },
                    },
                },
            },
        },
    }
    #swagger.responses[404] = {
    description: "가게 리뷰 추가하기 실패 응답",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    resultType: {
                        type: "string",
                        example: "FAIL"},
                    error: {
                        type: "object",
                        properties:{
                            statusCode:{type:"number",example:404},
                            errorCode:{type:"string",example:"S001"},
                            reason:{type:"string",example:"가게가 존재하지 않습니다."},
                            data:{ 
                                type:"object",
                                properties:{
                                    user_id:{type:"number",example:1},
                                    store_id:{type:"string",example:"100"},
                                    review_point:{type:"number",example:5},
                                    content:{type:"string",example:"맛있어요"},
                                    name:{type:"string",example:"랄프"}
                            }
                        }
                    }
                },
                    success: {
                        type: "object",
                        nullable: true,
                        example: "null",
                        },
                    },
                },
            },
        },
    }
    */
};
