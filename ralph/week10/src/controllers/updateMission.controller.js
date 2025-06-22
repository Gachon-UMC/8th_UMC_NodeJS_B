import { updateMission } from "../services/updateMission.service.js";
import { StatusCodes } from "http-status-codes";
export const handleUpdateMission = async (req, res) => {
    console.log("미션 업데이트 요청했습니다.");
    const userId = req.params.userId;
    const missionId = req.params.missionId;
    const mission = await updateMission(userId, missionId);
    console.log(mission);
    res.status(StatusCodes.OK).success(mission);
    /*
    #swagger.summary="미션 상태 업데이트하기 API"
    #swagger.responses[200] = {
    description: "미션 상태 업데이트 성공 응답",
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
                            count: { type: "number", example: 1 }
                            },
                        },
                    },
                },
            },
        },
    }
    #swagger.responses[404] = {
    description: "미션 상태 업데이트 실패 응답",
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
                            errorCode:{type:"string",example:"UM003"},
                            reason:{type:"string",example:"해당 미션 정보가 없거나 이미 처리되었습니다."},
                            data:{
                                type:"object", properties:{userId:{type:"string",example:"3"},missionId:{type:"string",example:"3"}}
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
    }*/
};
