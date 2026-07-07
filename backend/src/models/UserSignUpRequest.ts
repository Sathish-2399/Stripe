import {Property} from "@tsed/schema";

export class UserSignUpRequest {
    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property()
    phone!: string;

    @Property()
    password!: string;

}