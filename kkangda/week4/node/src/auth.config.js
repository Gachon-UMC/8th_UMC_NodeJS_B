import dotenv from "dotenv";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
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
            gender: 0,
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
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
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return naverVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const naverVerify = async (profile) => {
    const email = profile.email;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    // 생년월일 형식 만들기
    const birthYear = profile.birthYear;
    const birthday = profile.birthday;
    const [month, day] = birthday.split("-").map((s) => parseInt(s, 10));

    const created = await prisma.user.create({
        data: {
            email: profile.email,
            name: profile.name,
            gender: profile.gender === "M" ? 0 : 1,
            birth: new Date(Number(birthYear), month - 1, day),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phone: profile.mobile.replace(/-/g, "").slice(0, 11),
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};
