import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn
} from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({unique:true})
    user_id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    phone!: string;

    @Column()
    password!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;
}