export const bodyToReview = (data) => {
    return {
        user_id: data.user_id,
        store_id: data.store_id,
        review_point: data.review_point,
        content: data.content,
    };
};

export const responseFromReview = (res) => {
    console.log(res);
    return {
        id: res.id,
        user_id: res.user_id,
        store_id: res.store_id,
        review_point: res.review_point,
        content: res.content,
        created_at: res.created_at,
    };
};
