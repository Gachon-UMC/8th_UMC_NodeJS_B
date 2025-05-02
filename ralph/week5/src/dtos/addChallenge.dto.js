export const bodyToAddChallenge = (data) => {
    console.log(data);
    return {
        missionId: data.missionId,
        userId: data.userId,
    };
};
export const responseFromAddChallenge = (res) => {
    return {
        id: res.id,
        missionId: res.missionId,
        userId: res.userId,
        createdAt: res.createdAt,
    };
};
