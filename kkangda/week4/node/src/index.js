import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleUserMission } from "./controllers/user.mission.controller.js";
import { handleStoreReview } from "./controllers/store.review.controller.js";
import { handleStoreMission } from "./controllers/store.mission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import { handleUserMissionComplete } from "./controllers/user.mission.complete.controller.js";
import { handleListStoreMission } from "./controllers/get.store.mission.controller.js";
import { handleListUserReviews } from "./controllers/user.review.controller.js";

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

app.post("/api/v1/users/signup", handleUserSignUp);

app.post("/users/:userId/missions", handleUserMission);

app.post("/stores/:storeId/reviews", handleStoreReview);

app.post("/stores/:storeId/missions", handleStoreMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.patch("/users/:userId/missions", handleUserMissionComplete);

app.get("/stores/:storeId/missions", handleListStoreMission);

app.get("/users/:userId/reviews", handleListUserReviews);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
