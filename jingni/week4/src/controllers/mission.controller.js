import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToDoMission } from "../dtos/mission.dto.js";
import { addMission, modifyMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  
  const mission = await addMission(
    bodyToMission(
        {...req.body,
        store_id: parseInt(req.params.storeId)
        }
    ));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleUpdateMission = async (req,res, next) => {
  console.log("미션 도전하기를 요청했습니다 !");
  console.log("body: ",req.body);

  const missionId = req.params.missionId;
  const userId = req.user?.id || 1;

  if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "로그인이 필요합니다." });
  }

  const updatedMission = await modifyMission(
      bodyToDoMission(
          {...req.body,
          mission_id: missionId,
          user_id:userId
      })
  )
  res.status(StatusCodes.OK).json({result : updatedMission})
}