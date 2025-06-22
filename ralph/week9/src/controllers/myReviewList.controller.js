import { MyReviewList } from "../services/MyReviewList.service.js";
import { StatusCodes } from "http-status-codes";
export const handleMyReviewList = async (req, res) => {
    console.log("내 리뷰 목록 요청했습니다.");
    const userId = req.params.userId;
    console.log(userId);
    console.log(typeof req.query.cursor);
    const reviewList = await MyReviewList(
        parseInt(userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviewList);
    /*
    #swagger.summary= "내가 작성한 리뷰 목록 조회 API";
    #swagger.responses[200]={
        description: "내가 작성한 리뷰 목록 조회하기 성공 응답",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType: {type:"string",example:"SUCCESS"},
                        error:{
                        type:"object",nullable:true,example:null
                        },
                        success:{
                        type:"object",
                        properties:{
                            data:{type:"array",items:{
                            type:"object",
                            properties:{
                                id:{type:"number",example:1},
                                content:{type:"string",example:"맛있어요"},
                                review_point:{type:"number",example:12},
                                created_at:{type:"string",example:"2025-05-07T02:38:18.000Z"},
                                store:{type:"object",properties:{
                                    id:{type:"number",example:1},
                                    name:{type:"string",example:"명륜진사갈비"}
                                }}
                            }
                        }}}}
                    }
                }
            }
        }
    };
    #swagger.responses[404]={
        description:"내가 작성한 리뷰가 존재하지 않을 때",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string",example:"FAIL"},
                        error:{
                            type:"object",properties:{
                                statusCode: {type:"number",example:404},
                                errorCode:{type:"string",example:"MR006"},
                                reason:{type:"string",example:"현재 작성한 리뷰가 없습니다."},
                                data:{type:"array",
                                    items:{type:"object",nullable:true}
                                }}
                            }
                        }
                    }
                }
            }
        }*/
};
