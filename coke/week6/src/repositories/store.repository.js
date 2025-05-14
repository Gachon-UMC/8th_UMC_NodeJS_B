import { prisma } from "../db.config.js";

export const getStoreById = async (storeId) => {
  try {
    // storeId 값이 없거나 유효하지 않은 경우 체크
    if (!storeId || isNaN(parseInt(storeId))) {
      throw new Error('유효하지 않은 가게 ID입니다.');
    }
    
    const store = await prisma.store.findUnique({
      where: { id: parseInt(storeId) }
    });
    
    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다. (${err})`);
  }
};

export const createStore = async (storeData) => {
  try {
    const store = await prisma.store.create({
      data: {
        region: {
          connect: { id: parseInt(storeData.region_id) }
        },
        category: {
          connect: { id: parseInt(storeData.category_id) }
        },
        name: storeData.name,
        description: storeData.description,
        address: storeData.address,
        contact_number: storeData.contact_number,
        latitude: storeData.latitude,
        longitude: storeData.longitude,
        business_hours: storeData.business_hours,
        main_image: storeData.main_image,
        is_active: storeData.is_active || true
      }
    });
    
    return store.id;
  } catch (err) {
    throw new Error(`가게 등록 중 오류가 발생했습니다. (${err})`);
  }
};

//// 페이징 부분 추가
// 가게 리뷰 목록 조회 (커서 기반 페이징) 
export const getStoreReviews = async (storeId, cursor, limit = 5) => {
  try {
    // 커서가 있는 경우 해당 커서 이후의 리뷰를 조회
    const whereCondition = {
      store_id: parseInt(storeId)
    };
    
    if (cursor) {
      whereCondition.id = {
        lt: parseInt(cursor) // 커서보다 작은 ID (내림차순 정렬 기준)
      };
    }
    
    // 리뷰 목록 조회
    const reviews = await prisma.review.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            username: true
          }
        },
        reviewImages: {
          select: {
            id: true,
            image_url: true
          },
          take: 3, // 최대 3개의 이미지만 가져옴
          orderBy: {
            display_order: 'asc'
          }
        },
        reviewReplies: {
          select: {
            id: true,
            content: true,
            created_at: true
          },
          take: 1, // 최신 답글 1개만 가져옴
          orderBy: {
            created_at: 'desc'
          }
        }
      },
      orderBy: {
        id: 'desc' // 최신 리뷰부터 (ID 내림차순)
      },
      take: limit + 1 // 다음 페이지 확인을 위해 limit+1개 조회
    });
    
    // 다음 페이지 존재 여부 확인
    const hasNextPage = reviews.length > limit;
    // limit까지만 결과 반환
    const reviewResults = hasNextPage ? reviews.slice(0, limit) : reviews;
    // 다음 페이지 커서 설정
    const nextCursor = hasNextPage ? reviewResults[reviewResults.length - 1].id : null;
    
    return {
      reviews: reviewResults.map(review => ({
        id: review.id,
        user_id: review.user_id,
        username: review.user.username,
        rating: review.rating,
        content: review.content,
        created_at: review.created_at,
        images: review.reviewImages.map(img => img.image_url),
        hasReplies: review.reviewReplies.length > 0,
        latestReply: review.reviewReplies[0] || null
      })),
      nextCursor,
      hasNextPage
    };
  } catch (err) {
    throw new Error(`가게 리뷰 목록 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// 리뷰 이미지 가져오기 (함수 틀만 구현)
export const getReviewImages = async (reviewId) => {
  try {
    // 실제 구현에서는 특정 리뷰의 이미지를 가져오는 코드 작성
    // 지금은 함수 틀만 구현
    return [];
  } catch (err) {
    throw new Error(`리뷰 이미지 조회 중 오류가 발생했습니다. (${err})`);
  }
};

// 리뷰 답글 가져오기 (함수 틀만 구현)
export const getReviewReplies = async (reviewId) => {
  try {
    // 실제 구현에서는 특정 리뷰의 답글을 가져오는 코드 작성
    // 지금은 함수 틀만 구현
    return [];
  } catch (err) {
    throw new Error(`리뷰 답글 조회 중 오류가 발생했습니다. (${err})`);
  }
};