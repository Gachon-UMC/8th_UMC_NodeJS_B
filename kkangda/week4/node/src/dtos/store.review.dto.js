export const bodyToReview = (body) => {
    return {
        member_id: 1,
        store_id: 1,
        star_rating: body.star_rating,
        content: body.content,
    };
};

export const responseFromReview = (body) => {
    return {
        star_rating: body.star_rating,
        content: body.content,
    };
};
