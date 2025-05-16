import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToDoMission } from "../dtos/mission.dto.js";
import { addMission, challengeMission, showStoreMissions, completeMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
   /*
    #swagger.summary = '가게에 미션 추가하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string", example: "뿡빵뿡 미션" },
              content: { type: "string", example: "해봐라 미션 에베베" },
              point: { type: "integer", example: 30 },
              deadline: { type: "string", format: "date", example: "2025-05-16" }
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게에 미션 추가하기 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  content: { type: "string" },
                  point: { type: "integer" },
                  deadline: { type: "string", format: "date" }
                  store_id: { type: "integer" }
                },
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "미션 추가하기 실패 응답 - 해당 가게가 존재하지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string"" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                },
              },
              success: { type: "object", nullable: true }
            }
          }
        }
      }
    };
  */

  const storeId = Number(req.params.storeId)
  const mission = await addMission(
    bodyToMission(
        {...req.body,
        store_id: storeId
        }
    ));
  res.status(StatusCodes.OK).success(mission);
};

export const handleChallengeMission = async (req,res, next) => {
  console.log("미션 도전하기를 요청했습니다 !");
  console.log("body: ",req.body);

   /*
    #swagger.summary = '미션 도전하기 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "integer", example: 1 },
              user_id: { type: "integer", example: 1}
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전하기 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  status: { type: "integer" },
                  user_id: { type: "integer" }
                },
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "미션 추가하기 실패 응답 - 해당 미션이 존재하지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string"" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                },
              },
              success: { type: "object", nullable: true }
            }
          }
        }
      }
    };
    #swagger.responses[409] = {
      description: "미션 추가하기 실패 응답 - 이미 도전중인 미션 ",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string"" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                },
              },
              success: { type: "object", nullable: true }
            }
          }
        }
      }
    };
  */

  const missionId = req.params.missionId;
  const userId = req.user?.id || 1;

  if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }

  const updatedMission = await challengeMission(
      bodyToDoMission(
          {...req.body,
          mission_id: missionId,
          user_id:userId
      })
  )
  res.status(StatusCodes.OK).success(updatedMission)
}

export const handleStoreMissions = async (req,res,next) =>{
  console.log("특정 가게에 대한 미션 조회를 요청했습니다 !");
  console.log("body: ",req.body);

   /*
    #swagger.summary = '특정 가게에 대한 미션 조회하기 API';
    #swagger.requestBody = {
      required: false,
    };

    #swagger.responses[200] = {
      description: "특정 가게에 대한 미션 조회하기 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  store_id: { type: "integer" },
                },
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "특정 가게에 대한 미션 조회하기 실패 응답 - 해당 가게에 미션이 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string"" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                },
              },
              success: { type: "object", nullable: true }
            }
          }
        }
      }
    };
  */

  const storeId = parseInt(req.params.storeId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
  
  const missions = await showStoreMissions(storeId, cursor);

  res.status(StatusCodes.OK).success(missions)
}

export const handleCompleteMission = async (req,res,next) => {
  console.log("미션 완료하기 요청을 했습니다 !");
  console.log("body: ", req.body);

  const missionId = Number(req.params.missionId);
  const userId = req.user?.id || 1;

  if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }
  
  const mission = await completeMission(
    bodyToDoMission(
      {...req.body,
        mission_id: missionId
      }
    )
  );

  res.status(StatusCodes.OK).success(mission);
}