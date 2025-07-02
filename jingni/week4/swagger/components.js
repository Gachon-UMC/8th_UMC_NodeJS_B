// src/swagger/components.js
export default {
  responses: {
    Success: {
      description: "성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: { type: "object" },
              success: { type: "object" },
            },
          },
        },
      },
    },
    NotFoundStore: {
      description: "가게를 찾을 수 없습니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "error" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string", },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    NotFoundMission: {
      description: "미션을 찾을 수 없습니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    IsChallenging: {
      description: "이미 도전중인 미션입니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    NotFoundStoreMissions: {
      description: "해당 가게에 미션이 없습니다. ",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    NotFoundReview: {
      description: "조회할 리뷰가 없습니다. ",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    IsNotChallenging: {
      description: "도전중인 미션이 아닙니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    DuplicateUserEmail: {
      description: "이미 존재하는 이메일입니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    NotFoundUser: {
      description: "사용자를 찾을 수 없습니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    NoModifyInfo: {
      description: "수정할 정보가 없습니다.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true },
                },
              },
              success: { type: "object", nullable: true },
            },
          },
        },
      },
    }
  }
};