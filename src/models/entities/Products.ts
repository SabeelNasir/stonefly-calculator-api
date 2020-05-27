import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn({ name: 'id' })
    productId: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'salePrice', type: 'double' })
    salePrice: number

    @Column({ name: 'normalPrice', type: 'double' })
    normalPrice: number

    @Column({ name: 'imageUrl' })
    imageUrl: string

    @Column({ name: 'imageName' })
    imageName: string

    @Column({ name: 'createdAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: string

    @Column({ name: 'createdBy', nullable: false })
    createdBy: number

    @Column({ name: 'updatedAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: string

    @Column({ name: 'updatedBy' })
    updatedBy: number
}