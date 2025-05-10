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

app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({ resultType: "SUCCESS", error: null, success });
    };

    res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
        return res.json({
            resultType: "FAIL",
            error: { errorCode, reason, data },
            success: null,
        });
    };

    next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
    res.send("Hello World!");
});
// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);
// 미션 추가
app.post("/api/v1/mission/:storeid", handleAddMission);
// 리뷰 추가
app.post("/api/v1/store/:storeid/reviews", handleAddReview);
// 도전중인 미션에 추가
app.post("/api/v1/missions/:missionId", handleAddChallenge);

// 미션 목록 조회
app.get("/api/v1/stores/:storeid/reviews", handleStoreReviewList);
// 나의 리뷰 목록 조회
app.get("/api/v1/stores/:userId/reviews", handleMyReviewList);
// 가게별 리뷰 목록 조회
app.get("/api/v1/store/:storeId/missions", handleGetStoreMission);
// 나의 진행중인 리뷰 조회
app.get("/api/v1/missions/:userId", handleGetMyOngoingMission);
// 진행중인 리뷰 완료로 바꾸기
app.patch("/api/v1/mission/:userId/:missionId", handleUpdateMission);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        reason: err.reason || err.message || null,
        data: err.data || null,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
