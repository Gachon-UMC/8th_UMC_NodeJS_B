import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { bodyToAddMission } from "../dtos/addMission.dto.js";
import { addMissionStore } from "../services/addMission.service.js";
export const handleUserSignUp = async (req, res) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).json({ result: user });
};

export const handleAddMission = async (req, res) => {
    const storeId = req.params.storeid;
    console.log("미션 추가 요청했습니다.");
    // console.log(req.body);
    const mission = await addMissionStore(
        bodyToAddMission({ ...req.body, store_id: storeId })
    );
    // console.log(mission);
    res.status(StatusCodes.OK).json({ result: mission });
};
