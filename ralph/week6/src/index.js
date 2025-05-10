import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
    handleUserSignUp,
    handleAddMission,
    handleAddReview,
    handleAddChallenge,
    handleStoreReviewList,
    handleMyReviewList,
    handleGetStoreMission,
    handleGetMyOngoingMission,
    handleUpdateMission,
} from "./controllers/user.controller.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
    res.send("Hello World!");
});
// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);
//
app.post("/api/v1/missions/:missionId", handleAddChallenge);
// 미션 추가
app.post("/api/v1/mission/:storeid/users", handleAddMission);
// 리뷰 추가
app.post("/api/v1/store/:storeid/reviews", handleAddReview);


// 미션 목록 조회
app.get("/api/v1/stores/:storeid/reviews", handleStoreReviewList);

app.get("/api/v1/stores/:userId/reviews", handleMyReviewList);

app.get("/api/v1/store/:storeId/missions", handleGetStoreMission);

app.get("/api/v1/missions/:userId", handleGetMyOngoingMission);

app.patch("/api/v1/mission/:userId/:missionId", handleUpdateMission);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
