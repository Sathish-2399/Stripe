import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity("application_fees")
export class ApplicationFee {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    application_fee_id!: string;

    @Column()
    payment_link_id!: string;

    @Column()
    payment_intent_id!: string;

    @Column()
    charge_id!: string;

    @Column("decimal")
    amount!: number;

    @Column("decimal")
    fee!: number;

    @Column("decimal")
    net!: number;

    @Column()
    currency!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}