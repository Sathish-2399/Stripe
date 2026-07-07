import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("refunds")
export class Refund {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique:true})
    refund_id!: string;

    @Column()
    payment_intent_id!: string;

    @Column({ nullable: true })
    charge_id!: string;

    @Column("decimal")
    amount?: number;

    @Column({ nullable: true })
    reason?: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}