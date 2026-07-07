import { Property } from "@tsed/schema";

export class PaymentResponse {
    @Property()
    payment_intent_id!: string;

    @Property()
    charge_id!: string;

    @Property()
    balance_transaction_id!: string;

    @Property()
    payment_link_id!: string;

    @Property()
    application_fee_id!: string;

    @Property()
    amount!: number;

    @Property()
    currency!: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}