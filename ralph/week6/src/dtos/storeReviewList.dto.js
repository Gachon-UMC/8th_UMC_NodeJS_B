export const bodyToStoreReviewList = (data) => {
    return {
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
    };
};
export const responseFromStoreReviewList = (res) => {
    console.log("res", res);

    return {
        data: res,
        pagination: {
            cursor: res.length ? res[res.length - 1].id : null,
        },
    };
};
