import { Nullable } from "@tsed/schema";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity("balance_transactions")
export class BalanceTransaction {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    balance_transaction_id!: string;

    @Column()
    payment_intent_id!: string;

    @Column()
    charge_id!: string;

    @Column({nullable:true})
    application_fee_id?: string;

    @Column("decimal")
    amount!: number;

    @Column("decimal")
    fee!: number;

    @Column("decimal")
    net!: number;

    @Column()
    currency!: string;

    @Column()
    type!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}