export const bodyToGetStoreMission = (data) => {};
export const responseFromGetStoreMission = (res) => {
    return {
        data: res,
        pagination: {
            cursor: res.length ? res[res.length - 1].id : null,
        },
    };
};
