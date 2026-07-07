import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity("application_fee_refunds")
export class ApplicationFeeRefund {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    application_fee_refund_id!: string;

    @Column()
    application_fee_id!: string;

    @Column()
    refund_id!: string;

    @Column("decimal")
    amount!: number;

    @Column()
    currency!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}