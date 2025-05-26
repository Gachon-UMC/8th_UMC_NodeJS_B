import { StatusCodes } from "http-status-codes";
import { addMission, participateMission } from "../services/mission.service.js";

// 가게에 미션 추가 기능
export const handleAddMission = async (req, res, next) => {
   /* 
    #swagger.summary = '가게에 미션 추가 API'
    #swagger.description = '특정 가게에 새로운 미션을 추가합니다 (가게 주인 또는 관리자용)'
    #swagger.tags = ['미션', '가게']
    
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '미션을 추가할 가게의 ID',
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
            required: ["title", "reward_points"],
            properties: {
              title: { 
                type: "string", 
                description: "미션 제목", 
                example: "첫 방문 인증 미션" 
              },
              description: { 
                type: "string", 
                description: "미션 상세 설명", 
                example: "우리 가게를 처음 방문하여 음식 사진과 함께 인증해주세요!" 
              },
              reward_points: { 
                type: "integer", 
                description: "미션 완료 시 지급할 포인트", 
                example: 100 
              },
              start_date: { 
                type: "string", 
                format: "date-time", 
                description: "미션 시작 날짜/시간", 
                example: "2023-10-25T00:00:00Z" 
              },
              end_date: { 
                type: "string", 
                format: "date-time", 
                description: "미션 종료 날짜/시간", 
                example: "2023-11-25T23:59:59Z" 
              },
              type: { 
                type: "string", 
                description: "미션 유형", 
                example: "방문인증" 
              },
              is_active: { 
                type: "boolean", 
                description: "미션 활성화 여부", 
                example: true 
              },
              difficulty_level: { 
                type: "integer", 
                description: "미션 난이도 (1-5)", 
                minimum: 1, 
                maximum: 5, 
                example: 1 
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[201] = {
      description: "미션 추가 성공 - 새 미션이 성공적으로 등록됨",
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
                  id: { type: "integer", example: 5 },
                  store_id: { type: "integer", example: 1 },
                  title: { type: "string", example: "첫 방문 인증 미션" },
                  description: { type: "string", example: "우리 가게를 처음 방문하여 음식 사진과 함께 인증해주세요!" },
                  reward_points: { type: "integer", example: 100 },
                  start_date: { type: "string", format: "date-time", example: "2023-10-25T00:00:00Z" },
                  end_date: { type: "string", format: "date-time", example: "2023-11-25T23:59:59Z" },
                  type: { type: "string", example: "방문인증" },
                  is_active: { type: "boolean", example: true },
                  difficulty_level: { type: "integer", example: 1 }
                }
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[404] = {
      description: "가게 없음 - 미션을 추가하려는 가게가 존재하지 않음",
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
    
    // 현재 날짜/시간을 ISO 문자열로 생성
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const missionData = {
      ...req.body,
      store_id: storeId,
      // 필수 필드 누락 시 기본값 설정
      start_date: req.body.start_date || currentDate,
      end_date: req.body.end_date || currentDate,
      is_active: req.body.is_active !== undefined ? req.body.is_active : 1,
      difficulty_level: req.body.difficulty_level || 1
    };
    
    const mission = await addMission(missionData);
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    console.error("미션 추가 오류:", error);
    next(error);
  }
};

// 미션 도전하기 기능
export const handleParticipateMission = async (req, res, next) => {

   /* 
    #swagger.summary = '미션 도전하기 API'
    #swagger.description = '사용자가 특정 미션에 도전 참여를 신청합니다.'
    #swagger.tags = ['미션']
    
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '도전할 미션의 ID',
      required: true,
      type: 'integer',
      example: 5
    }
    
    #swagger.requestBody = {
      required: false,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              proof_image: { 
                type: "string", 
                description: "미션 인증 이미지 URL (미션 유형에 따라 필수일 수 있음)",
                example: "https://example.com/images/mission_proof.jpg" 
              }
            }
          }
        }
      }
    }
    
    #swagger.responses[201] = {
      description: "미션 도전 등록 성공 - 사용자의 미션 도전이 성공적으로 등록됨",
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
                  message: { type: "string", example: "미션 도전이 성공적으로 등록되었습니다." },
                  userMission: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 42 },
                      user_id: { type: "integer", example: 15 },
                      mission_id: { type: "integer", example: 5 },
                      assigned_date: { type: "string", format: "date-time", example: "2023-10-25T15:30:45Z" },
                      completed_date: { type: "string", format: "date-time", nullable: true, example: null },
                      status: { type: "string", example: "진행중" },
                      proof_image: { type: "string", nullable: true, example: "https://example.com/images/mission_proof.jpg" },
                      admin_comment: { type: "string", nullable: true, example: null }
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
      description: "미션 없음 - 요청한 ID의 미션이 존재하지 않음",
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
                  reason: { type: "string", example: "존재하지 않는 미션입니다." },
                  data: { type: "object", example: { "missionId": "999" } }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    
    #swagger.responses[400] = {
      description: "미션 도전 불가 - 미션이 비활성화되었거나 기간이 유효하지 않음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    description: "오류 코드 (R002: 미션 비활성화, T001: 시간 관련 오류)",
                    example: "R002" 
                  },
                  reason: { 
                    type: "string", 
                    description: "구체적인 오류 이유",
                    example: "비활성화된 미션입니다." 
                  },
                  data: { 
                    type: "object", 
                    description: "오류 관련 추가 데이터",
                    example: { "missionId": "5" } 
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    
    #swagger.responses[409] = {
      description: "미션 도전 중복 - 이미 도전 중인 미션에 재참여 시도",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "C001" },
                  reason: { type: "string", example: "이미 도전 중인 미션입니다." },
                  data: { type: "object", example: { "userId": 15, "missionId": 5 } }
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
    const { missionId } = req.params;
    // 실제 구현에서는 인증된 사용자 ID 사용
    // 테스트용으로 임시 ID 사용
    const userId = req.user?.id || 1;
    
    // 추가 데이터 처리 (예: 증명 이미지)
    const participationData = {
      user_id: userId,
      mission_id: missionId,
      proof_image: req.body.proof_image || null,
      assigned_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: '진행중'
    };
    
    const userMission = await participateMission(participationData);


    /* 기존 코드
    res.status(StatusCodes.CREATED).json({ 
      message: "미션 도전이 성공적으로 등록되었습니다.",
      result: userMission 
    });
    
   
  } catch (error) {
    console.error("미션 참여 오류:", error);
    
    // 특정 오류 메시지에 대한 상태 코드 처리
    if (error.message === "존재하지 않는 미션입니다.") {
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    } else if (error.message === "이미 도전 중인 미션입니다.") {
      return res.status(StatusCodes.CONFLICT).json({ message: error.message });
    }
    */


    return res.status(StatusCodes.CREATED).success({
      message: "미션 도전이 성공적으로 등록되었습니다.",
      userMission
    });
  } catch (error) {
    console.error("미션 참여 오류:", error);

    
    next(error);
  }
};