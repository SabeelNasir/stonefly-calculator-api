import { Request, Response } from "express";
import { AppConstants } from "../../config/AppConstants";
import { ResponseWrapperUtil } from "../../utils/ResponseWrapperUtil";
import { CommonUtil } from "../../utils/CommonUtil";
import { JwtUtil } from "../../utils/JwtUtil";

export const checkJwt = (req: Request, res: Response, next: any) => {
    let currentUri = req.url;
    let jwtUtil: JwtUtil = new JwtUtil();
    var authCookie = req.headers['cookie'] || req.headers['token']
    try {
        if (req.url == "/test") {
            next()
        }
        if (typeof authCookie != "undefined") {
            authCookie = authCookie.toString()
            if (authCookie.includes('access_token')) {
                var token = authCookie.split('access_token=')[1]
            } else {
                var token = authCookie
            }
            if (token != null) {
                let tokenData = jwtUtil.validateAndExtractToken(token);
                let user: any = tokenData;
                res.locals["user"] = user;
                next()
            } else {
                throw new Error("Unauthorized Access")
            }
        } else {
            throw new Error("Unauthorized Access")
        }
    } catch (err) {
        ResponseWrapperUtil.sendAuthErrorResponse(res, {
            apiId: CommonUtil.getApiId(req.url.toString()),
            responseCode: AppConstants.RESPONSE_CODES.FAIL,
            message: err.message
        })
    }
};