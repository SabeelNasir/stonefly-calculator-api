import { CompanyService } from "../services/CompanyService";
import { Companies } from "../models/entities/Companies";
import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { CommonUtil } from "../utils/CommonUtil";
import { Request, Response } from "express";
import { DateTimeUtil } from "../utils/DateTimeUtil";


export class CompaniesController {
    constructor() { }
    companyService: CompanyService = new CompanyService()

    getList(req: Request, res: Response) {
        CompanyService.getCompaniesList()
            .then((data: Companies[]) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    create(req: Request, res: Response) {
        const user = res.locals.user
        CompanyService.createCompany(req.body)
            .then((data: Companies) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                    message: 'Company Saved Successfully !'
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    update(req: Request, res: Response) {
        CompanyService.updateCompany(req.body, req.params.id)
            .then((data: Companies) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                    message: 'Company Updated Successfully !'
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    getById(req: Request, res: Response) {
        CompanyService.getCompanyById(req.params.id)
            .then((data: Companies) => {
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

}