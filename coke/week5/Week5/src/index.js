import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from "./routers/user.router.js"; // 사용자 라우터
import reviewRouter from './routers/review.router.js'; //리뷰 라우터

// __dirname 설정 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일이 상위 디렉토리에 있으므로 경로 지정
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3000; // 기본값 설정

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 개별 라우트 대신 라우터 모듈 사용
app.use("/api/v1/users", userRouter); 
app.use('/api/places', reviewRouter);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '서버 에러가 발생했습니다.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});