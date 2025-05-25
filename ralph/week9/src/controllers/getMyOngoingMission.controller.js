import { getMyOngoingMission } from "../services/getMyOngoingMission.service.js";
import { StatusCodes } from "http-status-codes";
export const handleGetMyOngoingMission = async (req, res) => {
    console.log("내 미션 조회 요청했습니다.");
    const userId = req.params.userId;
    const cursor = req.query.cursor;
    console.log("userId", userId, cursor);
    const onGoingMission = await getMyOngoingMission(
        parseInt(userId),
        typeof cursor === "string" ? parseInt(cursor) : 0
    );
    res.status(StatusCodes.OK).success(onGoingMission);
    /*
    #swagger.summary= "내가 진행중인 미션 목록 조회 API";
    #swagger.responses[200]={
        description: "내가 진행중인 미션 목록 조회하기 성공 응답",
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
                                user_id:{type:"number",example:1},
                                mission_id:{type:"number",example:12},
                                mission:{type:"object",properties:{
                                    id:{type:"number",example:1},
                                    status:{type:"number",example:0},
                                    content:{type:"string",example:"20000만원 이상 주문하기"},
                                    point:{type:"number",example:100},
                                    end_date:{type:"string",example:"2025-12-12T00:00:00.000Z"}
                                }}
                            }
                        }}}}
                    }
                }
            }
        }
    };
    #swagger.responses[404]={
        description:"내가 진행중인 미션이 존재하지 않을 때",
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
                                reason:{type:"string",example:"현재 진행중인 미션이 없습니다."},
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
