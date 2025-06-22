export const schemas = {
    UserInput: {
        type: "object",
        properties: {
            name: { type: "string", example: "하이" },
            password: { type: "string" },
            email: { type: "string" },
            birth: { type: "string", format: "date" },
            phoneNumber: { type: "string" },
            gender: { type: "string" },
            address: { type: "string" },
            myPoint: { type: "number" },
            preferences: { type: "array", items: { type: "number" } },
        },
    },
    ErrorResponse: {
        type: "object",
        properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
                type: "object",
                properties: {
                    statusCode: { type: "number", example: 409 },
                    errorCode: { type: "string", example: "U001" },
                    reason: { type: "string" },
                    data: {
                        $ref: "#/components/schemas/UserInput",
                    },
                },
            },
        },
    },
};
