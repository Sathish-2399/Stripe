import { Property } from "@tsed/schema";

export class MerchantSignUpRequest {

    @Property()
    business_name!: string;

    @Property()
    email!: string;

    @Property()
    password!: string;

    @Property()
    phone!: string;

    @Property()
    account_number!: string;

    @Property()
    ifsc_code!: string;

    @Property()
    bank_name!: string;
}