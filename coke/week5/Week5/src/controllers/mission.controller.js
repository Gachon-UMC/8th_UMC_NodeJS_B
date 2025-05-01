import { StatusCodes } from "http-status-codes";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const missionData = {
      ...req.body,
      store_id: storeId
    };
    
    const mission = await addMission(missionData);
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    next(error);
  }
};