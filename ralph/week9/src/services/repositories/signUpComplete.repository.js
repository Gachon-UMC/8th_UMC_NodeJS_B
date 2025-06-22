import { prisma } from "../../db.config.js";
export const updateUserDate = async (userId, data) => {
    const user = await prisma.user.updateMany({
        where: { id: userId },
        data: {
            password: data.passwd,
            birth: data.birth,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            address: data.address,
        },
    });
    if (user) console.log("업데이트 완료");
    else console.log("업데이트 실패");
    return user;
};
