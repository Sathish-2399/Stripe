import {
    Entity,Column,PrimaryGeneratedColumn, CreateDateColumn
} from "typeorm";

@Entity("merchants")
export class Merchant{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    merchant_id!: string;

    @Column()
    business_name!: string;

    @Column()
    email!: string

    @Column()
    password!: string;

    @Column()
    phone!: string;

    @Column()
    account_number!: string;

    @Column()
    ifsc_code!: string;

    @Column()
    bank_name!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}