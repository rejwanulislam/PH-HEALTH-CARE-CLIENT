import { CookieOptions, Response } from "express";

const setCookie = (res: Response, key: string, value: string, options: CookieOptions) => {
    res.cookie(key, value, {

    });

}


const getCookie = (req: any, key: string) => {
    return req.cookies[key];
};

const clearCookie = (res: Response, key: string, options?: CookieOptions) => {
    res.clearCookie(key, options);
};

export const cookieUtils = {
    setCookie,
    getCookie,
    clearCookie
};