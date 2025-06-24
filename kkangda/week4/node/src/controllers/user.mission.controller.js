import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user.mission.dto.js";
import { userMission } from "../services/user.mission.service.js";

export const handleUserMission = async (req, res, next) => {
    /*
    #swagger.summary = '미션 도전하기 API'

    #swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    schema: { type: 'number' },
    description: '사용자 ID'
    }

    #swagger.requestBody = {
    required: true,
    content: {
        "application/json": {
        schema: {
            type: "object",
            properties: {
            missionId: { type: "number" }
            }
        }
        }
    }
    }

    #swagger.responses[200] = {
    description: "미션 도전하기 성공 응답",
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
                mission_content: { type: "string" },
                is_finished: { type: "string" }
                }
            }
            }
        }
        }
    }
    }

    #swagger.responses[400] = {
    description: "미션 도전하기 실패 응답",
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
                    userId: { type: number },
                    missionId: { type: number },
                    isFinished: { type: number },
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
    console.log("미션 도전을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const result = await userMission(bodyToUserMission(req.body, parseInt(req.params.userId)));
    res.status(StatusCodes.OK).success(result);
};
