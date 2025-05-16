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
              deadline: { type: "string", format: "date", example: "2025-05-16" },
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[404] = {
      $ref: "#/components/responses/NotFoundStore"
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
              status: { type: "integer", example: 1 }
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[404] = {
      $ref: "#/components/responses/NotFoundMission"
    };
    #swagger.responses[409] = {
      $ref: "#/components/responses/IsChallenging"
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

export const handleCompleteMission = async (req,res,next) => {
  console.log("미션 완료하기 요청을 했습니다 !");
  console.log("body: ", req.body);

  /*
    #swagger.summary = '미션 완료하기 API';

    #swagger.requestBody = {
      required: false,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "integer", example: 2 },
            },
          }
        }
      }
    };
    
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[404] = {
      $ref: "#/components/responses/NotFoundMission"
    };
    #swagger.responses[409] = {
      $ref: "#/components/responses/IsNotChallenging"
    };
  */


  const missionId = Number(req.params.missionId);
  const userId = req.user?.id || 1;

  if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }
  
  const mission = await completeMission(
    bodyToDoMission(
      {...req.body,
        mission_id: missionId,
        user_id: userId,
      }
    )
  );

  res.status(StatusCodes.OK).success(mission);
}


export const handleStoreMissions = async (req,res,next) =>{
  console.log("특정 가게에 대한 미션 조회를 요청했습니다 !");
  /*
    #swagger.summary = '특정 가게에 대한 미션 조회하기 API';
    #swagger.method = 'get'
   
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[404] = {
      $ref: "#/components/responses/NotFoundStoreMissions"
    };
  */

  const storeId = parseInt(req.params.storeId);
  const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;
  
  const missions = await showStoreMissions(storeId, cursor);

  res.status(StatusCodes.OK).success(missions)
}
