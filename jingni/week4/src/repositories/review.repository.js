import { prisma } from "../db.config.js";

export const addReviewToDB = async (data) => {

    console.log(data.store_id)
    const store = await prisma.store.findFirst({where: {id:data.store_id} })

    if(!store){
      return null;
    }

    const created = await prisma.review.create({
      data: {
        title: data.title,
        content: data.content,
        rating: data.rating,
        user: {
          connect: { id: data.user_id }
        },
        store: {
          connect: { id: data.store_id }
        }
      }
    });
    return created.id;

  }

export const getReviewToDB = async (reviewId) => {
    
  const review = await prisma.review.findFirst({where: {id: reviewId}})
  if(!review){
    return null;
  }

  return review;
  }

  export const getAllReviewsFromDB = async (storeId, cursor) => {
    
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        content: true,
        rating: true,
        title: true,
        storeId: true,
        userId: true,
        store: true,
        user: true,
      },
      where: { 
        storeId: storeId, 
        id: { 
          gt: cursor 
        }
      },
      orderBy: { id: "asc" },
      take: 5,
    });
  
    return reviews;
  };

  export const getAllMyReviewsFromDB = async (userId, cursor) => {

    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        content: true,
        rating: true,
        title: true,
        storeId: true,
        userId: true,
        store: true,
        user: true,
      },
      where: { 
        userId: userId, 
        id: { 
          gt: cursor 
        }
      },
      orderBy: { id: "asc" },
      take: 5,
    });

    return reviews;
  }