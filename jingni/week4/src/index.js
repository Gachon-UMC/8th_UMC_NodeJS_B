import cors from "cors";
import dotenv from "dotenv";
// const express = require('express')  // -> CommonJS
import express from "express";         // -> ES Module

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddMission, handleUpdateMission, handleStoreMissions } from "./controllers/mission.controller.js";
import { handleAddReview, handleShowReviews, handleMyReviews } from "./controllers/review.controller.js";

dotenv.config();

const app = express()
// const port = 3000
const port = process.env.PORT;

// cors 방식 허용
app.use(cors());
 // 정적 파일 접근                            
app.use(express.static('public'));
// request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)         
app.use(express.json());
// 단순 객체 문자열 형태로 본문 데이터 해석                    
app.use(express.urlencoded({ extended: false }));     

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/v1/users/signup", handleUserSignUp); //POST 요청을 보내면 handleUserSingup이 실행될 것
app.patch("/api/v1/users/missions/:missionId", handleUpdateMission);
app.post("/api/v1/:storeId/missions/users", handleAddMission);
app.post("/api/v1/:storeId/reviews/users",handleAddReview);
app.get("/api/v1/stores/:storeId/reviews", handleShowReviews);
app.get("/api/v1/users/reviews", handleMyReviews);
app.get("/api/v1/:storeId/missions",handleStoreMissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})