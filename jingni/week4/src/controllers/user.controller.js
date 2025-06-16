import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, userModify } from "../services/user.service.js";

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
  res.status(StatusCodes.OK).success(user);
};

export const handleUserModify = async (req, res, next) => {
  console.log("회원정보 수정을 요청했습니다!");
  console.log("body:", req.body); 
  /*
    #swagger.summary = '회원 정보 수정 API';
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
            },
          }
        }
      }
    };
    #swagger.responses[200] = {
      $ref: "#/components/responses/Success"
    };
    #swagger.responses[404] = {
      $ref: "#/components/responses/NotFoundUser"
    };
    #swagger.responses[409] = {
      $ref: "#/components/responses/DuplicateUserEmail"
    };
    #swagger.responses[400] = {
      $ref: "#/components/responses/NoModifyInfo"
    };
          
  */
  
  const userId = parseInt(req.params.userId, 10);
  console.log(req.body)
  const user = await userModify(userId, bodyToUser({
    ...req.body,
  }));
  res.status(StatusCodes.OK).success(user);
}

