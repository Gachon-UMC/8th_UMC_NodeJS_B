import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
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
    const name = profile.displayName;
    console.log(name);
    console.log(profile);
    console.log(email);
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    console.log(user);
    if (user !== null) {
        return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
        };
    }
    console.log(user);
    const created = await prisma.user.create({
        data: {
            name: name,
            password: "oauth",
            email: email,
            birth: "1900-01-01",
            phoneNumber: "null",
            gender: "none",
            address: "소셜 로그인",
            myPoint: 0,
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
    const email = profile.emails?.[0]?.value;
    const name = profile.displayName;
    console.log(name);
    console.log(profile);
    console.log(email);
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    // console.log(user);
    if (user !== null) {
        return { id: user.id.toString(), email: user.email, name: user.name };
    }
    console.log(user);
    const created = await prisma.user.create({
        data: {
            name: name,
            password: "oauth",
            email: email,
            birth: "1900-01-01",
            phoneNumber: "000-0000-0000",
            gender: "none",
            address: "소셜 로그인",
            myPoint: 0,
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};
