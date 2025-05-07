export const bodyToMission = (body) => {
    return {
        store_id: 1,
        content: body.content,
        deadline: body.deadline,
        reward: body.reward,
    };
};

export const responseFromMission = (body) => {
    return {
        store_name: body.store_name,
        content: body.content,
        deadline: body.deadline,
        reward: body.reward,
    };
};
