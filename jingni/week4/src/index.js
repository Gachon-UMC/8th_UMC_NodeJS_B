import cors from "cors";
import dotenv from "dotenv";
// const express = require('express')  // -> CommonJS
import express from "express";         // -> ES Module

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddMission, handleChallengeMission, handleStoreMissions } from "./controllers/mission.controller.js";
import { handleAddReview, handleShowReviews, handleMyReviews } from "./controllers/review.controller.js";

dotenv.config();

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

app.post("/api/v1/users/signup", handleUserSignUp); //POST 요청을 보내면 handleUserSingup이 실행될 것
app.post("/api/v1/users/missions/:missionId", handleChallengeMission);
app.post("/api/v1/:storeId/missions/users", handleAddMission);
app.post("/api/v1/:storeId/reviews/users",handleAddReview);
app.get("/api/v1/stores/:storeId/reviews", handleShowReviews);
app.get("/api/v1/users/reviews", handleMyReviews);
app.get("/api/v1/:storeId/missions",handleStoreMissions);


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})