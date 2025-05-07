export const bodyToReview = (body) => {
    return {
        title: body.title,
        content: body.content,
        rating: Number(body.rating),
        user_id: Number(body.user_id),
        store_id: Number(body.store_id)
    }
}

export const responseFromReview = (review) => {
    return {
        id: review.id,
        title: review.title,
        content: review.content,
        rating: review.rating,
        userId: review.user_id,
        storeId: review.store_id
    }
}