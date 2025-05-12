import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";

export const handleUserSignUp = async (req, res, next) => {
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 디버깅용
    
    const userData = bodyToUser(req.body);
    const user = await userSignUp(userData);
    
    return res.status(StatusCodes.CREATED).success(user);
  } catch (error) {
    console.error("회원가입 오류:", error);
    
    next(error);
  }
};