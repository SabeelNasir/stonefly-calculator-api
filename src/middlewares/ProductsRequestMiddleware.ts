import { Request, Response } from 'express'
import Joi from 'joi'
import { ResponseWrapperUtil } from '../utils/ResponseWrapperUtil';
import { CommonUtil } from '../utils/CommonUtil';
import { AppConstants } from '../config/AppConstants';
export class ProductsRequestMiddleware {
    static verifyCreateRequest(req: Request, res: Response, next: any) {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            salePrice: Joi.number().required(),
            normalPrice: Joi.number().required(),
            imageName: Joi.string().optional()
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('create-product'),
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
            productId: Joi.number().optional(),
            name: Joi.string().optional(),
            salePrice: Joi.number().optional(),
            normalPrice: Joi.number().optional(),
            imageName: Joi.string().optional(),
        })
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
            if (err) {
                ResponseWrapperUtil.sendBadRequestResponse(res, {
                    apiId: CommonUtil.getApiId('update-product'),
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