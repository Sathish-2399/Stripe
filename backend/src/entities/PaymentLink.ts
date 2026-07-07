import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn } from "typeorm";

@Entity("Payment_Links")
export class PaymentLink {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    payment_link_id!: string;

    @Column()
    product!: string;

    @Column()
    price!: number;

    @Column()
    quantity!: number;

    @Column("decimal")
    amount!: number;

    @Column()
    currency!: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    status!: string;

    @Column({ unique: true })
    url!: string;

    @CreateDateColumn()
    created_at!: Date;
}