// middlewares/auth.middleware.js
export const authenticateUser = (req, res, next) => {
    // 간단한 더미 인증 미들웨어
    // 실제 구현에서는 JWT 토큰 검증 등을 수행해야 합니다
    console.log('인증 미들웨어 실행');
    
    // 지금은 인증을 스킵하고 다음 미들웨어로 진행
    // 실제 구현에서는 req.user에 사용자 정보를 설정해야 합니다
    next();
  };