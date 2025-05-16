import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/signUp.controller.js";
import { handleAddChallenge } from "./controllers/addChallenge.controller.js";
import { handleAddMission } from "./controllers/addMission.controller.js";
import { handleAddReview } from "./controllers/addReview.controller.js";
import { handleGetStoreMission } from "./controllers/getStoreMission.controller.js";
import { handleGetMyOngoingMission } from "./controllers/getMyOngoingMission.controller.js";
import { handleMyReviewList } from "./controllers/myReviewList.controller.js";
import { handleStoreReviewList } from "./controllers/storeReviewList.controller.js";
import { handleUpdateMission } from "./controllers/updateMission.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { schemas } from "./schemas.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(
        {},
        {
            swaggerOptions: {
                url: "/openapi.json",
            },
        }
    )
);

app.get("/openapi.json", async (req, res, next) => {
    // #swagger.ignore = true
    const options = {
        openapi: "3.0.0",
        disableLogs: true,
        writeOutputFile: false,
    };
    const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
    const routes = ["./src/index.js"];
    const doc = {
        info: {
            title: "UMC 8th",
            description: "UMC 8th Node.js 과제입니다.",
        },
        host: "localhost:3000",
        components: {
            schemas,
        },
    };

    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
});

app.use((req, res, next) => {
    res.success = (success) => {
        return res.json({ resultType: "SUCCESS", error: null, success });
    };

    res.error = ({
        errorCode = "unknown",
        statusCode = 500,
        reason = null,
        data = null,
    }) => {
        return res.json({
            resultType: "FAIL",
            error: { statusCode, errorCode, reason, data },
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
app.post("/api/v1/:userId/missions/:missionId", handleAddChallenge);
// 특정 가게 리뷰 목록 조회
app.get("/api/v1/stores/:storeid/reviews", handleStoreReviewList);
// 나의 리뷰 목록 조회
app.get("/api/v1/reviews/:userId", handleMyReviewList);
// 가게별 미션 목록 조회
app.get("/api/v1/store/:storeId/missions", handleGetStoreMission);
// 나의 진행중인 미션 조회
app.get("/api/v1/missions/:userId", handleGetMyOngoingMission);
// 진행중인 리뷰 완료로 바꾸기
app.patch("/api/v1/mission/:userId/:missionId", handleUpdateMission);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || "unknown",
        statusCode: err.statusCode || 500,
        reason: err.reason || err.message || null,
        data: err.data || null,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
