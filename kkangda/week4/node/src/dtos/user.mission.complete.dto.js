export const bodyToUserMission = (userId, body) => {
    return {
        userId: userId,
        missionId: body.missionId,
    };
};

export const responseFromUserMission = (body) => {
    return {
        id: body.id,
        store: body.store,
        content: body.content,
        reward: body.reward,
    };
};
