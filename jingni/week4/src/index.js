import cors from "cors";
import dotenv from "dotenv";
// const express = require('express')  // -> CommonJS
import express, { Router } from "express";         // -> ES Module

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddMission, handleChallengeMission, handleStoreMissions, handleCompleteMission } from "./controllers/mission.controller.js";
import { handleAddReview, handleShowReviews, handleMyReviews } from "./controllers/review.controller.js";

import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import components from "../swagger/components.js";

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

const app = express()
// const port = 3000
const port = process.env.PORT;

// 미들웨어 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ 
      resultType: "SUCCESS", 
      error: null, 
      success 
    });
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

// cors 방식 허용
app.use(cors());
 // 정적 파일 접근                            
app.use(express.static('public'));
// request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)         
app.use(express.json());
// 단순 객체 문자열 형태로 본문 데이터 해석                    
app.use(express.urlencoded({ extended: false }));

//전역 오류 처리하기 위한 미들웨어
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

//swagger 세팅
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp); //POST 요청을 보내면 handleUserSingup이 실행될 것
app.post("/api/v1/users/missions/:missionId", handleChallengeMission);
app.post("/api/v1/:storeId/missions/users", handleAddMission);
app.post("/api/v1/:storeId/reviews/users",handleAddReview);
app.patch("/api/v1/users/missions/:missionId",handleCompleteMission);
app.get("/api/v1/stores/:storeId/reviews", handleShowReviews);
app.get("/api/v1/users/reviews", handleMyReviews);
app.get("/api/v1/:storeId/missions",handleStoreMissions);

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true Swagger UI에서 굳이 보이지 않아도 되는 부분
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
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
    schemes: ["http"],
    components: components,
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

