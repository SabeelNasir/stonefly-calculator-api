import { getManager, getRepository } from "typeorm";
import { Companies } from "../models/entities/Companies";
import { DateTimeUtil } from "../utils/DateTimeUtil";
import { DbConstants } from '../config/DbConstants'

export class CompanyService {
    constructor() { }
    static async createCompany(reqData: any): Promise<Companies> {
        var company: any = getManager().getRepository(Companies)
        company = await company.save(reqData)
        return company
    }
    static async getCompaniesList(): Promise<Companies[]> {
        const companies = await getManager().getRepository(Companies).find({ select: DbConstants.LIST.companiesList })
        return companies
    }
    static async getCompanyById(id: any): Promise<Companies> {
        const company = await getManager().getRepository(Companies)
            .findOne({ where: { companyId: id }, select: DbConstants.LIST.companiesList })
        return company
    }
    static async updateCompany(reqData: any, companyId: any): Promise<Companies> {
        const repository = getRepository(Companies)
        let data: Companies = await repository.findOne({ where: { companyId: companyId } })
        if (data != null) {
            Object.assign(data, reqData)
            data.updatedAt = DateTimeUtil.getCurrentDateTime()
            data = await repository.save(data)
            return data
        } else {
            throw new Error('Company Does Not Exist')
        }
    }

}