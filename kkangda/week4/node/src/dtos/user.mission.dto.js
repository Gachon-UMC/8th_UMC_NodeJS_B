export const bodyToUserMission = (body) => {
    return {
        member_id: 1,
        mission_id: body.mission_id,
        is_finished: 0, // 진행중
    };
};

export const responseFromUserMission = (body) => {
    return {
        mission_content: body.mission_content,
        is_finished: "도전중",
    };
};
