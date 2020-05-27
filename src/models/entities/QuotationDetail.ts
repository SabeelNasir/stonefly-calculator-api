import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { type } from "os";
import { Companies } from "./Companies";
import { Quotations } from "./Quotations";
import { Products } from "./Products";

@Entity({ name: 'quotation_detail' })
export class QuotationDetail {
    @PrimaryGeneratedColumn({ name: 'id' })
    quotationDetailId: number

    @Column({ name: 'quantity', type: 'double' })
    quantity: number

    @Column({ name: 'productId', type: 'int' })
    productId: number

    @Column({ name: 'createdAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: string

    @ManyToOne(type => Quotations, quotation => quotation.quotationDetail)
    @JoinColumn({ name: 'quotationId' })
    quotation: Quotations

    @OneToOne(type => Products)
    @JoinColumn({ name: 'productId' })
    product: Products
}