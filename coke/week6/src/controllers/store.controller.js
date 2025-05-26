import { StatusCodes } from "http-status-codes";
import { getStore, getStoreReviewList, getReviewImageList, getReviewReplyList } from "../services/store.service.js";

// 가게 상세 정보 조회
export const handleGetStore = async (req, res, next) => {
    /* 
    #swagger.summary = '가게 상세 정보 조회 API'
    #swagger.description = '특정 가게의 상세 정보를 조회합니다.'
    #swagger.tags = ['가게']
    
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '조회할 가게의 ID',
      required: true,
      type: 'integer',
      example: 1
    }
    
    #swagger.responses[200] = {
      description: "가게 정보 조회 성공 - 요청한 가게의 상세 정보를 반환",
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
                  region_id: { type: "integer", example: 1 },
                  category_id: { type: "integer", example: 2 },
                  name: { type: "string", example: "맛있는 식당" },
                  description: { type: "string", example: "20년 전통의 맛집입니다." },
                  address: { type: "string", example: "서울시 강남구 역삼동 123-45" },
                  contact_number: { type: "string", example: "02-123-4567" },
                  latitude: { type: "number", format: "float", example: 37.5012 },
                  longitude: { type: "number", format: "float", example: 127.0396 },
                  business_hours: { type: "string", example: "09:00-21:00" },
                  main_image: { type: "string", example: "https://example.com/images/store1.jpg" },
                  is_active: { type: "boolean", example: true }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "가게 없음 - 요청한 ID의 가게가 존재하지 않음",
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
    const { storeId } = req.params;
    
    const store = await getStore(storeId);
    // res.status(StatusCodes.OK).json({ result: store }); // 이전 코드
    return res.status(StatusCodes.OK).success(store); // 수정된 코드
  } catch (error) {
    console.error("가게 정보 조회 오류:", error);
    
    // 이 부분은 서비스 레이어로 이동해야 함 (오류 처리는 서비스에서)
    next(error);
  }
};

// 가게 리뷰 목록 조회 (커서 기반 페이징)
export const handleGetStoreReviews = async (req, res, next) => {
   /* 
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.description = '특정 가게에 작성된 리뷰 목록을 커서 기반 페이지네이션으로 조회합니다.'
    #swagger.tags = ['리뷰', '가게']
    
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '리뷰를 조회할 가게의 ID',
      required: true,
      type: 'integer',
      example: 1
    }
    
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이징을 위한 커서값 (이전 응답의 nextCursor 값)',
      required: false,
      type: 'string',
      example: '42'
    }
    
    #swagger.parameters['limit'] = {
      in: 'query',
      description: '한 페이지에 반환할 최대 리뷰 수',
      required: false,
      type: 'integer',
      example: 10,
      default: 5
    }
    
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공 - 가게의 리뷰 목록을 페이지네이션하여 반환",
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
                  store_name: { type: "string", example: "맛있는 식당" },
                  reviews: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer", example: 42 },
                        user_id: { type: "integer", example: 15 },
                        username: { type: "string", example: "홍길동" },
                        rating: { type: "integer", example: 5 },
                        content: { type: "string", example: "맛있어요! 또 방문하고 싶습니다." },
                        created_at: { type: "string", format: "date-time", example: "2023-10-20T15:30:45Z" },
                        images: { 
                          type: "array", 
                          items: { type: "string" }, 
                          description: "리뷰 이미지 URL 목록 (최대 3개)",
                          example: ["url1.jpg", "url2.jpg"]
                        },
                        hasReplies: { 
                          type: "boolean", 
                          description: "리뷰에 답글이 있는지 여부",
                          example: true
                        },
                        latestReply: {
                          type: "object",
                          nullable: true,
                          description: "가장 최근 답글 정보 (있는 경우)",
                          properties: {
                            id: { type: "integer", example: 7 },
                            content: { type: "string", example: "소중한 리뷰 감사합니다! 다음에 또 방문해주세요." },
                            created_at: { type: "string", format: "date-time", example: "2023-10-21T09:15:30Z" }
                          }
                        }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    description: "페이지네이션 정보",
                    properties: {
                      nextCursor: { 
                        type: "string", 
                        nullable: true, 
                        description: "다음 페이지 조회를 위한 커서 값 (마지막 페이지인 경우 null)",
                        example: "36"
                      },
                      hasNextPage: { 
                        type: "boolean", 
                        description: "다음 페이지 존재 여부",
                        example: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "가게 없음 - 리뷰를 조회하려는 가게가 존재하지 않음",
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
    const { storeId } = req.params;
    const { cursor, limit = 5 } = req.query;
    
    const result = await getStoreReviewList(storeId, cursor, parseInt(limit));
    // res.status(StatusCodes.OK).json({ result }); // 이전 코드
    return res.status(StatusCodes.OK).success(result); // 수정된 코드
  } catch (error) {
    console.error("가게 리뷰 목록 조회 오류:", error);
    
    // 이 부분은 서비스 레이어로 이동해야 함 (오류 처리는 서비스에서)
    next(error);
  }
};

// 리뷰 이미지 조회 (함수 틀만 구현)
export const handleGetReviewImages = async (req, res, next) => {

  /* 
    #swagger.summary = '리뷰 이미지 조회 API'
    #swagger.description = '특정 리뷰에 첨부된 이미지 목록을 조회합니다.'
    #swagger.tags = ['리뷰']
    
    #swagger.parameters['reviewId'] = {
      in: 'path',
      description: '이미지를 조회할 리뷰의 ID',
      required: true,
      type: 'integer',
      example: 42
    }
    
    #swagger.responses[200] = {
      description: "리뷰 이미지 조회 성공 - 특정 리뷰에 첨부된 이미지 URL 목록을 반환",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 15 },
                    review_id: { type: "integer", example: 42 },
                    image_url: { type: "string", example: "https://example.com/images/review42_1.jpg" },
                    display_order: { type: "integer", example: 1 },
                    uploaded_at: { type: "string", format: "date-time", example: "2023-10-20T15:30:45Z" }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "리뷰 없음 - 요청한 ID의 리뷰가 존재하지 않음",
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
                  reason: { type: "string", example: "존재하지 않는 리뷰입니다." },
                  data: { type: "object", example: { "reviewId": "999" } }
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
    const { reviewId } = req.params;
    
    const images = await getReviewImageList(reviewId);
    // res.status(StatusCodes.OK).json({ result: images }); // 이전 코드
    return res.status(StatusCodes.OK).success(images); // 수정된 코드
  } catch (error) {
    console.error("리뷰 이미지 조회 오류:", error);
    next(error);
  }
};

// 리뷰 답글 조회 (함수 틀만 구현)
export const handleGetReviewReplies = async (req, res, next) => {
   /* 
    #swagger.summary = '리뷰 답글 조회 API'
    #swagger.description = '특정 리뷰에 작성된 답글 목록을 조회합니다.'
    #swagger.tags = ['리뷰']
    
    #swagger.parameters['reviewId'] = {
      in: 'path',
      description: '답글을 조회할 리뷰의 ID',
      required: true,
      type: 'integer',
      example: 42
    }
    
    #swagger.responses[200] = {
      description: "리뷰 답글 조회 성공 - 특정 리뷰에 작성된 답글 목록을 반환",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 7 },
                    review_id: { type: "integer", example: 42 },
                    owner_id: { type: "integer", example: 3 },
                    content: { type: "string", example: "소중한 리뷰 감사합니다! 다음에 또 방문해주세요." },
                    created_at: { type: "string", format: "date-time", example: "2023-10-21T09:15:30Z" },
                    updated_at: { type: "string", format: "date-time", example: "2023-10-21T09:15:30Z" }
                  }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "리뷰 없음 - 요청한 ID의 리뷰가 존재하지 않음",
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
                  reason: { type: "string", example: "존재하지 않는 리뷰입니다." },
                  data: { type: "object", example: { "reviewId": "999" } }
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
    const { reviewId } = req.params;
    
    const replies = await getReviewReplyList(reviewId);
    // res.status(StatusCodes.OK).json({ result: replies }); // 이전 코드
    return res.status(StatusCodes.OK).success(replies); // 수정된 코드
  } catch (error) {
    console.error("리뷰 답글 조회 오류:", error);
    next(error);
  }
};