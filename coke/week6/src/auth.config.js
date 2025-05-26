import dotenv from "dotenv";
import passport from "passport"; 
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from 'passport-naver-v2';
import { prisma } from "./db.config.js";

dotenv.config();


//////////////////
////아래는 구글////
/////////////////

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  // 기존 사용자 확인
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { 
      id: user.id, 
      email: user.email, 
      username: user.username // name 대신 username 사용
    };
  }

  // 제공된 코드를 내 DB대로 수정한거.
  const created = await prisma.user.create({
    data: {
      email,
      username: profile.displayName || "Google User", // name 을 username으로 바꿈
      password_hash: "google_oauth_user", // Google 로그인 사용자인걸 표시
      created_at: new Date(),
      last_login: new Date(), // 로그인 시간 기록
      is_active: true,
      phone_number: null, // 선택적 필드로 null 설정
      social_login_type: "google", // Google 로그인임을 표시
    },
  });

  return { 
    id: created.id, 
    email: created.email, 
    username: created.username 
  };
};

/////////////////
///아래는 네이버///
/////////////////

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/oauth2/callback/naver`, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 네이버 프로필에서 정보 추출
        const email = profile.email;
        const username = profile.name || profile.nickname;
        
        if (!email) {
          throw new Error('이메일 정보를 가져올 수 없습니다.');
        }

        // 기존 사용자 확인
        let user = await prisma.user.findFirst({ 
          where: { email } 
        });

        if (user) {
          // 기존 사용자 - 로그인 시간 업데이트
          user = await prisma.user.update({
            where: { id: user.id },
            data: { last_login: new Date() }
          });
        } else {
          // 새 사용자 생성
          user = await prisma.user.create({
            data: {
              email,
              username,
              password_hash: 'naver_oauth_user',
              created_at: new Date(),
              last_login: new Date(),
              is_active: true,
              phone_number: null,
              social_login_type: 'naver',
            }
          });
        }

        return done(null, {
          id: user.id,
          email: user.email,
          username: user.username
        });
      } catch (error) {
        console.error('네이버 로그인 오류:', error);
        return done(error);
      }
    }
  )
);