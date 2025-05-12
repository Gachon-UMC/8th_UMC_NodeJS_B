export const bodyToMission = (body, storeId) => {
    return {
        storeId: storeId,
        content: body.content,
        deadline: new Date(body.deadline),
        reward: body.reward,
    };
};

export const responseFromMission = (body) => {
    return {
        store_name: body.storeName,
        content: body.content,
        deadline: body.deadline,
        reward: body.reward,
    };
};
