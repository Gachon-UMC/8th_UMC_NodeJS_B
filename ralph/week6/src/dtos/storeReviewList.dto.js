export const bodyToStoreReviewList = (data) => {
    return {
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
    };
};
export const responseFromStoreReviewList = (res) => {
    return {
        id: res.id,
        user_name: res.user_name,
        store_name: res.store_name,
        review_point: res.review_point,
        content: res.content,
        created_at: res.created_at,
    };
};
