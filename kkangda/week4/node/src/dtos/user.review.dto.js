export const responseFromReviews = (reviews) => {
    const refinedData = reviews.map((review) => ({
        id: review.id,
        content: review.content,
        store_name: review.store.name,
        user_name: review.user.name,
    }));

    return {
        data: refinedData,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};
