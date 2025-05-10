export const responseToOngoingMission = (res) => {
    return {
        data: res,
        pagination: {
            cursor: res.length ? res[res.length - 1].id : 0,
        },
    };
};
