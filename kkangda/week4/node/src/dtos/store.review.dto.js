export const bodyToReview = (body, storeId) => {
    return {
        userId: 1,
        storeId: storeId,
        starRating: body.starRating,
        content: body.content,
    };
};

export const responseFromReview = (body) => {
    return {
        star_rating: body.starRating,
        content: body.content,
    };
};
