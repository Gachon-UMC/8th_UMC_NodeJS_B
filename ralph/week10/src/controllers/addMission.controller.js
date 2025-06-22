import { bodyToAddMission } from "../dtos/addMission.dto.js";
import { addMissionStore } from "../services/addMission.service.js";
import { StatusCodes } from "http-status-codes";
export const handleAddMission = async (req, res) => {
    const storeId = req.params.storeid;
    console.log("미션 추가 요청했습니다.");
    console.log(req.body);
    const mission = await addMissionStore(
        bodyToAddMission({ ...req.body, store_id: storeId })
    );
    console.log(mission);
    res.status(StatusCodes.OK).success(mission);
    /*
    #swagger.summary= " 가게에 미션 추가하기 API ";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type:"object",
            properties:{
                status: { type: "number" , example: 0 },
                content: { type: "string" , example: "10만원 이상 주문하기" },
                point: { type: "number" , example:50 },
                end_date: { type: "string" , example:"2025-06-11" },}
          },
        }
      }
    };
    #swagger.responses[200]={
        description: " 미션 추가하기 성공 응답",
        content: {
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
                            id:{type:"number" , example:1},
                            status:{type:"number",example:0},
                            content:{type:"string",example:"10만원 이상 주문하기"},
                            point:{type:"number",example:100},
                            store_id:{type:"number" , example:10},
                            end_date:{type:"string",example:"2025-06-11T00:00:00.000Z"},
                            created_at:{type:"string",example:"2025-05-16T16:11:05.000Z"}
                        }
                    }
                }
               }
            }
        }
    }
    #swagger.responses[404]={
        description: " 미션 추가하기 실패 응답",
        content: {
            "application/json":{
               schema:{
                type:"object",
                properties:{
                    resultType: {type:"string",example:"FAIL"},
                    error:{
                        type:"object",
                        properties:{
                            statusCode:{ type:"number",example:404},
                            errorCode:{ type:"string",example:"S001"},
                            reason:{ type:"string",example:"해당 가게가 존재하지 않습니다."},
                            data:{ 
                                type:"object",
                                properties:{
                                    status:{type:"number",example:0},
                                    content:{type:"string",example:"10만원 이상 주문하기"},
                                    point:{type:"number",example:100},
                                    store_id:{type:"number" , example:10},
                                    end_date:{type:"string",example:"2025-06-11T00:00:00.000Z"},
                                }
                            }
                        }
                    },
                    success:{
                        type:"string",nullable:true,example:null
                    }
                }
                }
            }
        }
    }*/
};
