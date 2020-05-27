import { Request, Response } from 'express'
import Joi from 'joi'
import { ResponseWrapperUtil } from '../utils/ResponseWrapperUtil';
import { CommonUtil } from '../utils/CommonUtil';
import { AppConstants } from '../config/AppConstants';
export class UserRequestMiddleware {
    static verifyUserLoginRequest(req: Request, res: Response, next: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('user-login'),
                    responseCode: AppConstants.RESPONSE_CODES.FAIL,
                    message: err.details[0].message.toString(),
                    // error: err
                })
            }
            else {
                next()
            }
        })
    }
}