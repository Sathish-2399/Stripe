import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from "typeorm";

@Entity("charges")
export class Charge {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    charge_id!: string;

    @Column()
    payment_intent_id!: string;

    @Column("decimal")
    amount!: number;

    @Column()
    currency!: string;

    @Column()
    status!: string;

    @Column()
    paid!: boolean;

    @CreateDateColumn()
    created_at!: Date;
}