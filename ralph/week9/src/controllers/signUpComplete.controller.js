import { signUpComplete } from "../services/signUpComplete.service.js";

export const handleUserSignUpComplete = async (req, res) => {
    console.log("회원 정보 수정을 요청했습니다.");
    const userId = req.user.id;
    const data = req.body;
    console.log(userId);
    const userUpdate = await signUpComplete(userId, data);
    if (userUpdate) return res.redirect("/");
};
