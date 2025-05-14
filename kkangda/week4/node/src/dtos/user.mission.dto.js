export const bodyToUserMission = (body, userId) => {
    return {
        userId: userId,
        missionId: body.missionId,
        isFinished: 0, // 도전중
    };
};

export const responseFromUserMission = (result) => {
    return {
        mission_content: result,
        is_finished: "도전중",
    };
};
