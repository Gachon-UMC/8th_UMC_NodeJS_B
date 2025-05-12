export const authenticateUser = (req, res, next) => {
    // 간단한 더미 인증 미들웨어
    // 실제 구현에서는 JWT 토큰 검증 등 기타 필요
    console.log('인증 미들웨어 실행');
    
    // 지금은 인증을 스킵하고
    // 실 구현에선 req.user에 사용자 정보를 설정 필요해용
    next();
  };