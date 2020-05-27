import { getManager } from "typeorm";
import { Products } from "../models/entities/Products";
import { DateTimeUtil } from "../utils/DateTimeUtil";

export class ProductService {
    constructor() { }
    static async createProduct(reqData: Products): Promise<Products> {
        var data: any = await getManager().getRepository(Products).save(reqData)
        return data
    }
    static async updateProduct(reqData: Products, productId: any, user?: any): Promise<Products> {
        var data: Products = await getManager().getRepository(Products).findOne({ where: { productId: productId } })
        if (data != null) {
            reqData.updatedAt = DateTimeUtil.getCurrentDateTime()
            reqData.updatedBy = user.id
            Object.assign(data, reqData)
            console.log(reqData)
            console.log(data)
            data = await getManager().getRepository(Products).save(data)
            return data
        } else {
            throw new Error('Product Does Not Exist')
        }
    }
    static async getProductsList(): Promise<Products[]> {
        const data = await getManager().getRepository(Products)
            .find({ select: ["name", "salePrice", "normalPrice", "imageName", "productId"] })
        return data
    }
    static async getProductById(id: number): Promise<Products> {
        const data = await getManager().getRepository(Products).findOne({ where: { productId: id }, select: ["productId", "name", "salePrice", "normalPrice", "imageName"] })
        return data
    }
}