export const bodyToAddChallenge = (data) => {
    console.log(data);
    return {
        missionId: data.missionId,
        userId: data.userId,
    };
};
export const responseFromAddChallenge = ({
    id,
    missionId,
    userId,
    createdAt,
}) => {
    return {
        id: id,
        missionId: missionId,
        userId: userId,
        createdAt: createdAt,
    };
};
