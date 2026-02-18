import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { jwt } from "zod";
import { envVars } from "../../config/env";
import { cookieUtils } from "./cookie";
import { Response } from "express";

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtUtils.
        createToken(
            payload,
            envVars.ACCESS_TOKEN_SECRET,
            { expiresIn: envVars.ACCESS_TOKEN_EXPIRATION } as SignOptions
        )
    return accessToken;
}

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtUtils.createToken(
        payload,
        envVars.REFRESH_TOKEN_SECRET,
        { expiresIn: envVars.REFRESH_TOKEN_EXPIRATION } as SignOptions
    )
    return refreshToken;
}

const setAccessTokenCookie = (res: any, accessToken: string) => {
    cookieUtils.setCookie(res, "accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 60 * 24  // 1 day in seconds
    });
}

const setRefreshTokenCookie = (res: any, refreshToken: string) => {
    cookieUtils.setCookie(res, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 60 * 24 * 7  // 7 days in seconds
    });
}

const setBetterAuthSeationCookie = (res: Response, accessToken: string, refreshToken: string) => {

    cookieUtils.setCookie(res, 'better-auth.session_token', JSON.stringify({ accessToken, refreshToken }), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 60 * 24//1 day in seconds

    })
}

export const tokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSeationCookie
}