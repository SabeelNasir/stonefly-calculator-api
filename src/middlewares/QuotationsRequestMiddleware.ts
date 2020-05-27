import { Request, Response } from 'express'
import Joi from 'joi'
import { ResponseWrapperUtil } from '../utils/ResponseWrapperUtil';
import { CommonUtil } from '../utils/CommonUtil';
import { AppConstants } from '../config/AppConstants';
export class QuotationsRequestMiddleware {
    static verifyCreateRequest(req: Request, res: Response, next: any) {
        const schema = Joi.object().keys({
            companyId: Joi.number().required(),
            title: Joi.string().required(),
            totalPrice: Joi.number().required(),
            totalDiscount: Joi.number().optional(),
            totalDiscountedPrice: Joi.number().optional(),
            quotationDetail: Joi.array().items({
                productId: Joi.number().required(),
                quantity: Joi.number().min(1).required()
            })
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('create-quotation'),
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
            quotationId: Joi.number().required(),
            quoteNo: Joi.string().optional(),
            companyId: Joi.number().optional(),
            title: Joi.string().optional(),
            totalPrice: Joi.number().optional(),
            totalDiscount: Joi.number().optional(),
            totalDiscountedPrice: Joi.number().optional(),
            quotationDetail: Joi.array().items({
                quotationDetailId: Joi.number().optional(),
                productId: Joi.number().required(),
                quantity: Joi.number().min(1).required()
            })
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('update-quotation'),
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