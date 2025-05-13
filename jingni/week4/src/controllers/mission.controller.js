import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToDoMission } from "../dtos/mission.dto.js";
import { addMission, challengeMission, showStoreMissions, completeMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");

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