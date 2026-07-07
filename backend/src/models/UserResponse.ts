import { Property } from "@tsed/schema";

export class UserResponse {

    @Property()
    user_id!: string;

    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property()
    phone!: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}