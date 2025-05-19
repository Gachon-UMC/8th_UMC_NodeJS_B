import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {

   /* 
    #swagger.summary = '가게 리뷰 추가 API'
    #swagger.description = '사용자가 특정 장소(가게)에 대한 리뷰를 작성합니다.'
    #swagger.tags = ['리뷰']
    
    #swagger.parameters['placeId'] = {
      in: 'path',
      description: '리뷰를 작성할 가게의 ID',
      required: true,
      type: 'integer',
      example: 1
    }
    
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["rating", "content"],
            properties: {
              rating: { 
                type: "integer", 
                description: "리뷰 평점 (1-5)", 
                minimum: 1, 
                maximum: 5, 
                example: 5 
              },
              content: { 
                type: "string", 
                description: "리뷰 내용", 
                example: "맛있고 서비스도 좋았습니다. 다음에 또 방문하고 싶어요!" 
              },
              mission_id: { 
                type: "integer", 
                description: "연관된 미션 ID (옵션)", 
                nullable: true, 
                example: 3 
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[201] = {
      description: "리뷰 등록 성공 - 새 리뷰가 성공적으로 등록됨",
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
                  id: { type: "integer", example: 42 },
                  user_id: { type: "integer", example: 15 },
                  store_id: { type: "integer", example: 1 },
                  mission_id: { type: "integer", nullable: true, example: 3 },
                  rating: { type: "integer", example: 5 },
                  content: { type: "string", example: "맛있고 서비스도 좋았습니다!" },
                  created_at: { type: "string", format: "date-time", example: "2023-10-25T15:30:45Z" },
                  updated_at: { type: "string", format: "date-time", example: "2023-10-25T15:30:45Z" },
                  is_verified: { type: "boolean", example: false },
                  helpful_count: { type: "integer", example: 0 }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "가게 없음 - 리뷰를 작성하려는 가게가 존재하지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "존재하지 않는 가게입니다." },
                  data: { type: "object", example: { "storeId": "999" } }
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
    const { placeId } = req.params; // storeId와 동일 의미로 가정
    // 실제 구현에서는 인증된 사용자 ID 사용
    // 테스트용으로 임시 ID 사용
    const userId = req.user?.id || 1;

    // 현재 날짜/시간을 ISO 문자열로 생성
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    
    const reviewData = {
      ...req.body,
      user_id: userId,
      store_id: placeId,
      created_at: new Date(),
      updated_at: new Date(),
      is_verified: false,
      helpful_count: 0
    };
    
    const review = await addReview(reviewData);

    /*
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error("리뷰 추가 오류:", error);
    next(error);
  }
    */
   
  return res.status(StatusCodes.CREATED).success(review); // 수정된 코드
  } catch (error) {
    console.error("리뷰 추가 오류:", error);
    next(error);
  }
  
};