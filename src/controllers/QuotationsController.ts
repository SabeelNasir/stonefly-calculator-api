import { Request, Response } from 'express'
import { createQuotation, updateQuotation, deleteQuotation } from '../services/QuotationService'
import { Quotations } from '../models/entities/Quotations'
import { DateTimeUtil } from '../utils/DateTimeUtil'
import { ResponseWrapperUtil } from '../utils/ResponseWrapperUtil'
import { getManager } from 'typeorm'
import { DbConstants } from '../config/DbConstants'

export class QuotationsController {
    create(req: Request, res: Response) {
        const user = res.locals.user
        var quotationObj: Quotations = new Quotations()
        Object.assign(quotationObj, req.body)
        createQuotation(quotationObj, user)
            .then((result) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    message: "Quotation Created Successfully !"
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err
                })
            })
    }
    update(req: Request, res: Response) {
        const user = res.locals.user
        updateQuotation(req.body, req.params.id, user)
            .then((result) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    message: "Quotation Updated Successfully !"
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err
                })
            })
    }
    delete(req: Request, res: Response) {
        const user = res.locals.user
        deleteQuotation(req.params.id)
            .then((result) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    message: "Quotation Deleted Successfully !"
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err
                })
            })
    }
    getQuotations(req: Request, res: Response) {
        getManager().getRepository(Quotations)
            .createQueryBuilder('quotation')
            .leftJoinAndSelect('quotation.company', 'company')
            .leftJoinAndSelect('quotation.quotationDetail', 'quotationDetail')
            .select(DbConstants.LIST.quotationsList)
            .getMany()
            .then((data: Quotations[]) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    getQuotationById(req: Request, res: Response) {
        getManager().getRepository(Quotations)
            .createQueryBuilder('quotation')
            .leftJoinAndSelect('quotation.company', 'company')
            .leftJoinAndSelect('quotation.quotationDetail', 'quotationDetail')
            .select(DbConstants.LIST.quotationsList)
            .where('quotationId = :quotationId', { quotationId: req.params.id })
            .getOne()
            .then((data: Quotations) => {
                if (data != null) {
                    ResponseWrapperUtil.sendSuccessResponse(res, {
                        data: data,
                    })
                } else {
                    ResponseWrapperUtil.sendBadRequestResponse(res, {
                        message: 'Quotation Not Found'
                    })
                }
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }

}