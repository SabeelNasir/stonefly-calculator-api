import { Request, Response } from 'express'
import Joi from 'joi'
import { ResponseWrapperUtil } from '../utils/ResponseWrapperUtil';
import { CommonUtil } from '../utils/CommonUtil';
import { AppConstants } from '../config/AppConstants';
export class CompaniesRequestMiddleware {
    static verifyCreateRequest(req: Request, res: Response, next: any) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            address: Joi.string().required(),
            contactNo: Joi.string().required(),
            contactName: Joi.string().required(),
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('create-company'),
                    responseCode: AppConstants.RESPONSE_CODES.FAIL,
                    message: err.details[0].message.toString()
                })
            }
            else {
                next()
            }
        })
    }
    static verifyUpdateRequest(req: Request, res: Response, next: any) {
        const schema = Joi.object().keys({
            companyId: Joi.number().optional(),
            name: Joi.string().optional(),
            email: Joi.string().optional(),
            address: Joi.string().optional(),
            contactNo: Joi.string().optional(),
            contactName: Joi.string().optional(),
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('update-company'),
                    responseCode: AppConstants.RESPONSE_CODES.FAIL,
                    message: err.details[0].message.toString()
                })
            }
            else {
                next()
            }
        })
    }
}