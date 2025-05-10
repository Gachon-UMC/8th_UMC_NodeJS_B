export const bodyToAddChallenge = (data) => {
    console.log(data);
    return {
        missionId: data.missionId,
        userId: data.userId,
    };
};
export const responseFromAddChallenge = (res) => {
    return {
        data: res,
    };
};
