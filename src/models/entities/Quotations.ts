import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { type } from "os";
import { Companies } from "./Companies";
import { QuotationDetail } from "./QuotationDetail";

@Entity({ name: 'quotations' })
export class Quotations {
    @PrimaryGeneratedColumn({ name: 'id' })
    quotationId: number

    @Column({ name: 'quoteNo' })
    quoteNo: string

    @Column({ name: 'companyId' })
    companyId: number

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'totalPrice', type: 'double' })
    totalPrice: string

    @Column({ name: 'totalDiscount', type: 'double' })
    totalDiscount: number

    @Column({ name: 'totalDiscountedPrice', type: 'double' })
    totalDiscountedPrice: number

    @Column({ name: 'createdAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: string

    @Column({ name: 'createdBy' })
    createdBy: number

    @Column({ name: 'updatedAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: string

    @Column({ name: 'updatedBy' })
    updatedBy: number

    @OneToOne(type => Companies)
    @JoinColumn({ name: 'companyId' })
    company: Companies

    @OneToMany(type => QuotationDetail, quotationDetail => quotationDetail.quotation)
    quotationDetail: QuotationDetail[]
}