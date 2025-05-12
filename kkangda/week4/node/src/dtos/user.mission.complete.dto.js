export const bodyToUserMission = (userId, body) => {
    return {
        userId: userId,
        missionId: body.missionId,
    };
};

export const responseFromUserMission = (body) => {
    return {
        data: body,
    };
};
