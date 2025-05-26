import dotenv from "dotenv";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from 'passport-naver-v2';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { Strategy as GithubStrategy } from 'passport-github';

import { prisma } from "./db.config.js";


dotenv.config();

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

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: -1,
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      phone: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/naver",
        scope: ["name", "email", "gender", "birthyear", "birthday", "mobile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb)=>{
        return naverVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));        
    }
);

const naverVerify = async (profile) => {
    console.log('NAVER PROFILE:', JSON.stringify(profile, null, 2));

    const response = profile._json?.response;
    const email = response.email;
    //Naver에는 생년월일 필드가 없음 -> 조합해야함
    const fullBirthDate = new Date(`${response.birthyear}-${response.birthday}`);
    //Naver Response는 F/M로 성별 구분 -> 나의 table은 0과 1로 구분
    const genderValue = response.gender === "F" ? 0 : 1;

    if(!email){
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: {email} });
    if(user !=null){
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data:{
            email,
            name: response.name,
            gender: genderValue,
            birth: fullBirthDate,
            address: "추후 수정",
            phone: response.mobile
        },
    });

    return { id: created.id, email: created.email, name: created.name, gender: created.gender, birth: created.birth, phone: created.phone};
}

export const kakaoStrategy = new KakaoStrategy(
    {
        clientID: process.env.PASSPORT_KAKAO_REST_API_KEY,
        callbackURL: "/oauth2/callback/kakao",
        scope: [ "account_email" ],
        state: true
    },
    (accessToken, refreshToken, profile, cb) => {
        return kakaoVerify(profile)
            .then((user) => cb(null,user))
            .catch((err) => cb(err));
    }
);

const kakaoVerify = async (profile) => {
    console.log('KAKAO PROFILE:', JSON.stringify(profile, null, 2));
    const response = profile._json?.kakao_account;

    if(!response.email){
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({
        where: { email: response.email }
    });

   if(user!== null){
    return { id: user.id, email: user.email };    
   }

   const created = await prisma.user.create({
    data: {
      email: response.email,
      name: "추후 수정",
      gender: -1,
      birth: "추후 수정",
      address: "추후 수정",
      phone: "추후 수정",
    },
   });

   return { id: created.id, email: created.email};
}

export const githubStrategy = new GithubStrategy(
    {
        clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/github",
        scope: [ "read:user", "user:email"],
        state: true
    }, 
    (accessToken, refreshToken, profile, cb) => {
        return githubVerify(profile)
            .then((user) => cb(null,user))
            .catch((err) => cb(err));
    }
);

const githubVerify = async (profile) => {
    console.log("GITHUB PROFILE: ", JSON.stringify(profile, null, 2));
    const email = profile.emails?.[0]?.value;
    if(!email){
        throw new Error(`profile.email was not found: ${profile}`);
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if(user !== null){
        return { id: user.id, email: user.email, name: user.name };
    }
    const created = await prisma.user.create({
        data: {
            email,
            name: profile.username,
            gender: -1,
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            phone: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
}