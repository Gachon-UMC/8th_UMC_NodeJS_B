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
import { handleUserSignUpComplete } from "./controllers/signUpComplete.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { schemas } from "./schemas.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
dotenv.config();

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: true })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
    console.log(req.user);
    res.send("Hello World!");
});
// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);
// 소셜 로그인시 회원 정보 추가하기
app.patch("/api/v1/users/signup/complete", handleUserSignUpComplete);
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
// 사용자가 추가 정보를 입력하는 페이지

// 소셜 로그인
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
    "/oauth2/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/oauth2/login/google",
        failureMessage: true,
    }),
    (req, res) => {
        if (req.user.phoneNumber == "null") {
            res.redirect("/signup/complete");
        } else {
            console.log(req.user);
            res.redirect("/");
        }
    }
);

app.get("/oauth2/login/naver", passport.authenticate("naver"));

app.get(
    "/oauth2/callback/naver",
    passport.authenticate("naver", {
        failureRedirect: "/oauth2/login/naver",
        failureMessage: true,
    }),
    (req, res) => {
        if (req.user.phoneNumber) {
            res.redirect("/");
        } else {
            res.redirect("/signUp/complete");
        }
    }
);

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
