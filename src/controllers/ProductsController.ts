import { ResponseWrapperUtil } from "../utils/ResponseWrapperUtil";
import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { Products } from "../models/entities/Products";
import { getManager } from "typeorm";
import { CommonUtil } from "../utils/CommonUtil";
import { DateTimeUtil } from "../utils/DateTimeUtil";
import moment from "moment";
import { AppConstants } from "../config/AppConstants";
import path from 'path'
import fs from 'fs'


export class ProductsController {

    constructor() { }

    getProducts(req: Request, res: Response) {
        ProductService.getProductsList()
            .then((data: Products[]) => {
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
    createProduct(req: Request, res: Response) {
        const user = res.locals.user
        req.body.createdBy = user.id
        ProductService.createProduct(req.body)
            .then((data: Products) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                    message: 'Product Saved Successfully !'
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    updateProduct(req: Request, res: Response) {
        ProductService.updateProduct(req.body, req.params.id, res.locals.user)
            .then((data: Products) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                    message: 'Product Updated Successfully !'
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    getProductById(req: Request, res: Response) {
        ProductService.getProductById(parseInt(req.params.id))
            .then((data: Products) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    data: data,
                    message: 'Product Saved Successfully !'
                })
            })
            .catch((err) => {
                ResponseWrapperUtil.sendErrorResponse(res, {
                    message: err.message,
                    error: err,
                })
            })
    }
    uploadImage(req: Request, res: Response) {
        const folderPath = path.join(__dirname + '/../../' + AppConstants.FILE_UPLOAD_FOLDER)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }
        const uploadedFile: any = req.files
        const fileName = moment().unix() + "_" + uploadedFile.file.name
        uploadedFile.file.mv(folderPath + fileName)
            .then((result: any) => {
                ResponseWrapperUtil.sendSuccessResponse(res, {
                    message: "File uploaded succesfully",
                    data: {
                        fileName: fileName
                    }
                });
            })
            .catch((error: Error) => {
                console.log(`Error : ${error.message}`)
            })
    }
}