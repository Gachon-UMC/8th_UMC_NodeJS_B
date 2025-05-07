import { pool, prisma } from "../db.config.js";

export const addReviewToDB = async (data) => {
    const conn = await pool.getConnection();
  
    try{
      const [confirm] = await conn.query('SELECT EXISTS ( SELECT 1 FROM store WHERE id = ?) AS isExistStore', [data.store_id]);

      console.log("rating:", data.rating, typeof data.rating);
      console.log("user_id:", data.user_id, typeof data.user_id);
      console.log("store_id:", data.store_id, typeof data.store_id);

      if(!confirm[0].isExistStore){
        return null;
      }

      const [result] = await conn.query(
        `INSERT INTO review (title, content, rating, user_id, store_id) VALUES (?, ?, ?, ?, ?);`,[
          data.title,
          data.content,
          data.rating,
          data.user_id,
          data.store_id
        ]
      )
      return result.insertId;
    } catch(err){
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
  }

export const getReviewToDB = async (reviewId) => {
    const conn = await pool.getConnection();

    try{
      const [review] = await conn.query("SELECT id FROM review WHERE id = ?", [reviewId])

      console.log(review);

      if(review.length == 0){
        return null;
      }

      return review;
    }catch(err){
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      )
    }finally{
      conn.release();
    }
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