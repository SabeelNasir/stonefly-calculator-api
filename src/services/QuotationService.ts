import { Quotations } from "../models/entities/Quotations";
import { QuotationDetail } from '../models/entities/QuotationDetail';
import { getRepository, getManager, getConnection } from "typeorm";
import { Products } from "../models/entities/Products";
import { DateTimeUtil } from "../utils/DateTimeUtil";

export const createQuotation = async (reqData: Quotations, user?: any) => {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect()
    try {
        let totalPrice = 0;
        reqData.quoteNo = new Date().getTime().toString()
        reqData.createdBy = user.id
        let qDetails: Array<QuotationDetail> = new Array<QuotationDetail>()
        reqData.quotationDetail.forEach(item => {
            let qDetailObj = new QuotationDetail()
            Object.assign(qDetailObj, item)
            qDetailObj.quotation = reqData
            qDetails.push(qDetailObj)
        })
        await queryRunner.startTransaction()
        await queryRunner.manager.save(reqData)
        await queryRunner.manager.save(qDetails)
        await queryRunner.commitTransaction()
    } catch (err) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw err;
    }
    finally {
        await queryRunner.release()
    }
}

export const updateQuotation = async (reqData: Quotations, quotationId: any, user?: any) => {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect()
    try {
        let quotationRow = await getManager().getRepository(Quotations).findOne({ where: { quotationId: quotationId } })
        if (quotationRow != null) {
            reqData.updatedAt = DateTimeUtil.getCurrentDateTime()
            reqData.updatedBy = user.id
            Object.assign(quotationRow, reqData)
            let qDetails: Array<QuotationDetail> = new Array<QuotationDetail>()
            quotationRow.quotationDetail.forEach(item => {
                let qDetailObj = new QuotationDetail()
                qDetailObj.quotation = quotationRow
                Object.assign(qDetailObj, item)
                qDetails.push(qDetailObj)
            })
            await queryRunner.startTransaction()
            await queryRunner.manager.save(quotationRow)
            await queryRunner.manager.delete(QuotationDetail, `quotationId = ${quotationId}`)
            await queryRunner.manager.save(qDetails)
            await queryRunner.commitTransaction()
        } else {
            throw new Error("Quotation Not Found")
        }
    } catch (err) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw err;
    }
    finally {
        await queryRunner.release()
    }
}
export const deleteQuotation = async (quotationId: any) => {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect()
    try {
        let quotationRow = await getManager().getRepository(Quotations).findOne({ where: { quotationId: quotationId } })
        if (quotationRow != null) {
            await queryRunner.startTransaction()
            await queryRunner.manager.remove(quotationRow)
            await queryRunner.commitTransaction()
        } else {
            throw new Error("Quotation Not Found")
        }
    } catch (err) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw err;
    }
    finally {
        await queryRunner.release()
    }
}