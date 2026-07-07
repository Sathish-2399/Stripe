import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity("payment_intents")
export class PaymentIntent {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    payment_intent_id!: string;

    @Column()
    payment_link_id!: string;

    @Column("decimal")
    amount!: number;

    @Column()
    currency!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}