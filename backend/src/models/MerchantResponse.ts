import { Property } from "@tsed/schema";

export class MerchantResponse {

    @Property()
    merchant_id!: string;

    @Property()
    business_name!: string;

    @Property()
    email!: string;

    @Property()
    phone!: string;

    @Property()
    account_number!: string;

    @Property()
    ifsc_code!: string;

    @Property()
    bank_name!: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}