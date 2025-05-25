import { addChallengeMission } from "../services/addChallenge.service.js";
import { bodyToAddChallenge } from "../dtos/addChallenge.dto.js";
import { StatusCodes } from "http-status-codes";
export const handleAddChallenge = async (req, res) => {
    console.log("미션 도전하기를 요청했습니다.");
    const missionId = req.params.missionId;
    const userId = req.params.userId;
    // const userId = Math.floor(Math.random() * 20) + 1; // userId 를 모르기 임의로 id 가 생성되도록 함
    // // 이렇게 안하면 userId 와 movieId 가 기존에 DB 에 있는거랑 중복되어서 오류가 발생
    const patchMission = await addChallengeMission(
        bodyToAddChallenge({ missionId, userId })
    );
    console.log(patchMission);
    res.status(StatusCodes.OK).success(patchMission);
    /*
    #swagger.summary= " 도전중인 미션에 추가하기 API";
    #swagger.responses[200]={
        description: "도전 중인 미션에 추가하기 성공 응답",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType: {type:"string",example:"SUCCESS"},
                        error:{
                        type:"object",nullable:true,example:null
                        },
                        success:{
                        type:"object",properties:{
                        id:{type:"number",example:77}}}
                    }
                }
            }
        }
    };
    #swagger.responses[404]={
        description:"해당 미션이 존재하지 않을 때",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string",example:"FAIL"},
                        error:{
                            type:"object",properties:{
                                statusCode: {type:"number",example:404},
                                errorCode:{type:"string",example:"SM505"},
                                reason:{type:"string",example:"해당 미션이 없습니다."},
                                data:{type:"object",
                                    properties:{
                                    missionId:{type:"string", example:"100"}
                                }}
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[409]={
        description:" 이미 도전 중인 미션에 추가되어 있을 때",
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        resultType:{type:"string",example:"FAIL"},
                        error:{
                            type:"object",properties:{
                                statusCode: {type:"number",example:409},
                                errorCode:{type:"string",example:"SM002"},
                                reason:{type:"string",example:"이미 존재하는 user_mission입니다."},
                                data:{type:"object",
                                    properties:{
                                    missionId:{type:"string", example:"100"},
                                    userId:{type:"string", example:"4"}
                                }}
                            }
                        }
                    }
                }
            }
        }
    }*/
};
