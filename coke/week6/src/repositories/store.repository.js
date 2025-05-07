import { prisma } from "../db.config.js";

export const getStoreById = async (storeId) => {
  try {
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