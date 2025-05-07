import { prisma } from "../db.config.js";


export const createReview = async (reviewData) => {
  try {
    const review = await prisma.review.create({
      data: {
        user: {
          connect: { id: parseInt(reviewData.user_id) }
        },
        mission: reviewData.mission_id ? {
          connect: { id: parseInt(reviewData.mission_id) }
        } : undefined,
        store: {
          connect: { id: parseInt(reviewData.store_id) }
        },
        rating: reviewData.rating,
        content: reviewData.content,
        created_at: reviewData.created_at,
        updated_at: reviewData.updated_at,
        is_verified: reviewData.is_verified,
        helpful_count: reviewData.helpful_count
      }
    });
    
    return review.id;
  } catch (err) {
    throw new Error(`리뷰 등록 중 오류가 발생했습니다. (${err})`);
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: parseInt(reviewId) }
    });
    
    return review;
  } catch (err) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다. (${err})`);
  }
};


// 사용자가 작성한 리뷰 목록 조회 Week6 신규추가
export const getUserReviews = async (userId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        user_id: parseInt(userId)
      },
      include: {
        store: {
          select: {
            name: true
          }
        },
        reviewImages: {
          select: {
            image_url: true,
            display_order: true
          },
          orderBy: {
            display_order: 'asc'
          }
        },
        reviewReplies: {
          select: {
            content: true,
            created_at: true
          },
          orderBy: {
            created_at: 'desc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    
    return reviews.map(review => ({
      id: review.id,
      store_name: review.store.name,
      rating: review.rating,
      content: review.content,
      created_at: review.created_at,
      helpful_count: review.helpful_count,
      images: review.reviewImages.map(img => img.image_url),
      replies: review.reviewReplies.map(reply => ({
        content: reply.content,
        created_at: reply.created_at
      }))
    }));
  } catch (err) {
    throw new Error(`사용자 리뷰 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};