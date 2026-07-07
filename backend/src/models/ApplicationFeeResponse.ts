import { Property } from "@tsed/schema";

export class ApplicationFeeResponse{
    @Property()
    application_fee_id!: string;

    @Property()
    payment_intent_id!: string;

    @Property()
    charge_id!: string;

    @Property()
    amount!: number;

    @Property()
    fee!: number;

    @Property()
    net!: number;

    @Property()
    currency!: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}