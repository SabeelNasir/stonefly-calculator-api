import { Request, Response, NextFunction } from "express";
import { AppConstants } from "../../config/AppConstants";
import { ResponseWrapperUtil } from "../../utils/ResponseWrapperUtil";
import { CommonUtil } from "../../utils/CommonUtil";
import { JwtUtil } from "../../utils/JwtUtil";
import { Users } from "../../models/entities/Users";

export const checkUserRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: Users = res.locals.user
    if (roles.includes(user.userRole)) {
      next()
    } else {
      ResponseWrapperUtil.sendAuthErrorResponse(res, {
        apiId: CommonUtil.getApiId(req.url.toString()),
        message: "You are not authorized to perform this Action",
        responseCode: AppConstants.RESPONSE_CODES.FAIL
      })
    }
  }
}