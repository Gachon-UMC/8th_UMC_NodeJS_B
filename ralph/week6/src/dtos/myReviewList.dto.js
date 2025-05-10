export const bodyToMyReviewList = (data) => {
    return {};
};
export const responseToMyReviewList = (res) => {
    return {
        data: res,
        pagination: {
            cursor: res.length ? res[res.length - 1].id : null,
        },
    };
};
