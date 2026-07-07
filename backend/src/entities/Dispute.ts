import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn } from "typeorm";

@Entity("disputes")
export class Dispute {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  dispute_id!: string;

  @Column({ nullable: true })
  payment_intent_id?: string;

  @Column({ nullable: true })
  charge_id?: string;

  @Column("decimal")
  amount!: number;

  @Column()
  currency!: string;

  @Column({ nullable: true })
  reason?: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  evidence?: string;

  @CreateDateColumn()
  created_at!: Date;
}