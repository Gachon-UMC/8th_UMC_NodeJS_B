import { getStoreMission } from "../services/getStoreMission.service.js";
import { StatusCodes } from "http-status-codes";
export const handleGetStoreMission = async (req, res) => {
    console.log(`${req.params.storeId}의 미션을 조회하셨습니다.`);
    const storeId = req.params.storeId;
    const cursor = req.query.cursor;
    const mission = await getStoreMission(
        storeId,
        typeof cursor === "string" ? parseInt(cursor) : 0
    );
    res.status(StatusCodes.OK).success(mission);
    /*
    #swagger.summary= "특정 가게 미션 목록 조회 API";
    #swagger.responses[200]={
        description: "특정 가게 미션 목록 조회하기 성공 응답",
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
                        type:"object",properties:{
                        data:{type:"array",items:{
                            type:"object",
                            properties:{
                                id:{type:"number",example:11},
                                content:{type:"string",example:"20만원 이상 주문하기"},
                                end_date:{type:"string",example:"2025-12-12T00:00:00.000Z"},
                                point:{type:"number",example:100},
                                status:{type:"number",example:0},
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
        description:"특정 가게의 미션이 존재하지 않을 때",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string",example:"FAIL"},
                        error:{
                            type:"object",properties:{
                                statusCode: {type:"number",example:404},
                                errorCode:{type:"string",example:"SM005"},
                                reason:{type:"string",example:"해당 가게의 미션이 없습니다."},
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
