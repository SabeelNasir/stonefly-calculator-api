import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn({ name: 'id' })
    userId: number;

    @Column({ name: 'userRole' })
    userRole: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'firstName' })
    firstName: string;

    @Column({ name: 'lastName' })
    lastName: string;

    @Column({ name: 'createdAt', type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: 'updatedAt', type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

}