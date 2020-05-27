import { UserService } from "./../services/UserService";
import { Request, Response } from "express";
import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { CommonUtil } from "../utils/CommonUtil";
import { AppConstants } from "../config/AppConstants";
import crypto from "crypto";

export class UserController {
  userService: UserService = new UserService();

  constructor() { }
  generatePassword = (req: Request, res: Response) => {
    res.send({
      password: crypto
        .createHash("md5")
        .update(req.body.request.password)
        .digest("hex")
    })

  }

  userLogin = (req: Request, res: Response) => {
    console.log("-- user login --")

    this.userService.userLogin(req.body).then(
      result => {
        res.cookie(AppConstants.COOKIE_NAME, result.token, {
          maxAge: AppConstants.COOKIE_EXPIRY_TIME,
          httpOnly: true
        })
        ResponseWrapperUtil.sendSuccessResponse(res, {
          data: result
        })
      },
      err => {
        ResponseWrapperUtil.sendErrorResponse(res, {
          message: err.message || "Error in login",
          error: err.message
        });
      }
    );
  };

  logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        ResponseWrapperUtil.sendErrorResponse(res, {
          message: err.message || "Error in logout",
          error: err.message
        });
      } else {
        ResponseWrapperUtil.sendSuccessResponse(res, {
          message: 'Logged Out !'
        })
      }
    })
  }
}
