import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  console.log("미션 작성을 요청했습니다!");
  console.log("body:", req.body);

  const storeId = req.params.storeId;

  const mission = await addMission(
    bodyToMission(
        {...req.body,
        store_id: storeId
        }
    ));
  res.status(StatusCodes.OK).json({ result: mission });
};