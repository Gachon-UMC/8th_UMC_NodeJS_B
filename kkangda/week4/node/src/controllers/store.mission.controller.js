import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/store.mission.dto.js";
import { storeMission } from "../services/store.mission.service.js";

export const handleStoreMission = async (req, res, next) => {
    /*
    #swagger.summary = '가게에 미션 추가하기 API'

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
            content: { type: "string" },
            deadline: { type: "string", format: "date" },
            reward: { type: "number" }
            }
        }
        }
    }
    }

    #swagger.responses[200] = {
    description: "가게에 미션 추가하기 성공 응답",
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
                store_name: { type: "string" },
                content: { type: "string" },
                deadline: { type: "string", format: "date-time" },
                reward: { type: "number" }
                }
            }
            }
        }
        }
    }
    }

    #swagger.responses[404] = {
    description: "가게에 미션 추가하기 실패 응답",
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
                    $ref: "#/components/schemas/Mission"
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
    console.log("미션 작성을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const mission = await storeMission(bodyToMission(req.body, parseInt(req.params.storeId)));
    res.status(StatusCodes.OK).success(mission);
};
