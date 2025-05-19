import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";

export const handleUserSignUp = async (req, res, next) => {

   /* 
    #swagger.summary = '회원 가입 API'
    #swagger.description = '새로운 사용자를 등록하고 계정을 생성합니다.'
    #swagger.tags = ['사용자']
    
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "username", "password"],
            properties: {
              email: { 
                type: "string", 
                format: "email", 
                description: "사용자의 이메일 주소 (중복 불가)",
                example: "user@example.com" 
              },
              username: { 
                type: "string", 
                description: "사용자 이름",
                example: "홍길동" 
              },
              password: { 
                type: "string", 
                format: "password", 
                description: "사용자 비밀번호",
                example: "password123" 
              },
              phoneNumber: { 
                type: "string", 
                description: "사용자 전화번호", 
                example: "010-1234-5678" 
              },
              preferences: { 
                type: "array", 
                description: "사용자 선호 카테고리 ID 목록",
                items: { type: "integer" }, 
                example: [1, 3, 5] 
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[201] = {
      description: "회원 가입 성공 - 새 사용자가 성공적으로 등록됨",
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
                  id: { type: "integer", example: 1 },
                  username: { type: "string", example: "홍길동" },
                  email: { type: "string", example: "user@example.com" },
                  created_at: { type: "string", format: "date-time", example: "2023-10-25T15:30:45Z" },
                  is_active: { type: "boolean", example: true },
                  phone_number: { type: "string", example: "010-1234-5678" },
                  preferCategory: { type: "array", items: { type: "string" }, example: ["한식", "중식"] }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[409] = {
      description: "이메일 중복 - 입력한 이메일이 이미 다른 사용자에 의해 사용 중",
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
                  reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                  data: { type: "object", example: { "email": "user@example.com" } }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  
   
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