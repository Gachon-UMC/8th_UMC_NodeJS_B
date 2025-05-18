import { StatusCodes } from "http-status-codes";
import { listStoreMission } from "../services/get.store.mission.service.js";

export const handleListStoreMission = async (req, res, next) => {
    /*
    #swagger.summary = '가게 미션 목록 조회 API';

    #swagger.parameters['cursor'] = {
    in: 'query',
    required: false,
    schema: { type: 'number' },
    description: '커서'
    }


    #swagger.parameters['storeId'] = {
    in: 'path',
    required: true,
    schema: { type: 'number' },
    description: '가게 ID'
    }

    #swagger.responses[200] = {
    description: "가게 미션 목록 조회 성공 응답",
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
                        content: { type: "string" },
                        deadline: { type: "string", format: "date-time" },
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
      description: "가게 미션 목록 조회 실패 응답",
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
                       storeId: { type: "number" },
                       cursor: { type: "number" }
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

    const missions = await listStoreMission(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
};
