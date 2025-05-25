import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/signUp.dto.js";
import { userSignUp } from "../services/signUp.service.js";

export const handleUserSignUp = async (req, res) => {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserInput"
          },
          example: {
            email: "hi@example.com",
            name: "홍길동",
            birth: "2024-09-13",
            phoneNumber: "010-1234-5678",
            gender: "남성",
            address: "서울시 강남구",
            myPoint: 100,
            preferences: [1, 2, 3]
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  preferences: { type: "array", items: { type: "object", properties:{
                  id: { type: "number" ,example:1 }, category: { type: "string",example:"양식" }} } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
          $ref: "#/components/schemas/ErrorResponse"
          },
          example: {
            resultType: "FAIL",
            error:{
              statusCode: 409 , 
              errorCode: "U001",
              reason: "이미 존재하는 이메일입니다." , 
              data: {
                email: "hi@example.com",
                name: "홍길동",
                birth: "2024-09-13",
                phoneNumber: "010-1234-5678",
                gender: "남성",
                address: "서울시 강남구",
                myPoint: 100,
                preferences: [1, 2, 3]}
                }
            
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    };
  */
};
