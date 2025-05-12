import { StatusCodes } from "http-status-codes";
import { listStoreMission } from "../services/get.store.mission.service.js";

export const handleListStoreMission = async (req, res, next) => {
    const missions = await listStoreMission(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
};
