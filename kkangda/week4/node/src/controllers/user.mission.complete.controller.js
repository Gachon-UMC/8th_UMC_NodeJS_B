import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user.mission.complete.dto.js";
import { userMissionComplete } from "../services/user.mission.complete.service.js";

export const handleUserMissionComplete = async (req, res, next) => {
    /*
    #swagger.summary = '내가 진행 중인 미션을 진행 완료로 바꾸기 API';

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
    description: "내가 진행 중인 미션을 진행 완료로 바꾸기 성공 응답",
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
                        id: { type: "number" },
                        store: { $ref: "#/components/schemas/Store" },
                        content: { type: "string" },
                        reward: { type: "number" }
                    }
                    }
                },
                pagination: {
                    type: "object",
                    properties: {
                    cursor: { type: "number", nullable: true }
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
      description: "내가 진행 중인 미션을 진행 완료로 바꾸기 실패 응답",
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
                       missionId: { type: "number" }
                    }
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

    const result = await userMissionComplete(bodyToUserMission(parseInt(req.params.userId), req.body));
    res.status(StatusCodes.OK).success(result);
};
