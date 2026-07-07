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
    charge_id!: string;

    @Column("decimal")
    fee!: number;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}