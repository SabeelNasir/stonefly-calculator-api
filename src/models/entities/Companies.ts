import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'companies' })
export class Companies {
    @PrimaryGeneratedColumn({ name: 'id' })
    companyId: number

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'email', nullable: false })
    email: string

    @Column({ name: 'address', nullable: false })
    address: string

    @Column({ name: 'contactNo', nullable: false })
    contactNo: string

    @Column({ name: 'contactName', nullable: false })
    contactName: string

    @Column({ name: 'createdAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: string

    @Column({ name: 'updatedAt', type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: string

}