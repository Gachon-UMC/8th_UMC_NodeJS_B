import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
 /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "number" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              phone: { type: "string" },
              password: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[409] = {
      $ref: "#/components/responses/DuplicateUserEmail"
    };
  */

  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};