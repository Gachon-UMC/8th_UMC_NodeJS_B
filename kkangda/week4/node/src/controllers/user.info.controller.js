import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.info.dto.js";
import { userInfo } from "../services/user.info.service.js";

export const handleUserInfo = async (req, res, next) => {
    /*
    #swagger.summary = '회원 정보 수정 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User"
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 정보 수정 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                $ref: "#/components/schemas/User"
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 정보 수정 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: {
                       $ref: "#/components/schemas/User"
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const user = await userInfo(bodyToUser(req.params.userId, req.body));

    res.status(StatusCodes.OK).success(user);
};
