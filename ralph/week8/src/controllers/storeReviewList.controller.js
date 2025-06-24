import { getStoreReviewList } from "../services/storeReviewList.service.js";
import { StatusCodes } from "http-status-codes";
export const handleStoreReviewList = async (req, res) => {
    console.log("리뷰 목록 요청했습니다.");
    const storeId = req.params.storeid;
    // console.log(storeId);
    const reviewList = await getStoreReviewList(
        parseInt(storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviewList);
    /*
    #swagger.summary= "특정 가게 리뷰 목록 조회 API";
    #swagger.responses[200]={
        description: "특정 가게 리뷰 목록 조회하기 성공 응답",
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
                                id:{type:"number",example:11},
                                store_id:{type:"number",example:1},
                                review_point:{type:"number",example:12},
                                content:{type:"string",example:"맛있어요"},
                                user:{type:"object",properties:{
                                    id:{type:"number",example:1},
                                    name:{type:"string",example:"랄프"}
                                }}
                            }
                        }}}}
                    }
                }
            }
        }
    };
    #swagger.responses[404]={
        description:"특정 가게의 리뷰가 존재하지 않을 때",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string",example:"FAIL"},
                        error:{
                            type:"object",properties:{
                                statusCode: {type:"number",example:404},
                                errorCode:{type:"string",example:"SR007"},
                                reason:{type:"string",example:"해당 가게의 리뷰가 없습니다."},
                                data:{type:"array",
                                    items:{type:"object",nullable:true}
                                }}
                            }
                        }
                    }
                }
            }
        }
    }*/
};
