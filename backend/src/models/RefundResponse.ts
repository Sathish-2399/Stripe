import { Property } from "@tsed/schema";

export class RefundResponse {

    @Property()
    refund_id!: string;

    @Property()
    payment_intent_id?: string;

    @Property()
    charge_id?: string;

    @Property()
    application_fee_refund_id?: string;

    @Property()
    amount?: number;

    @Property()
    reason?: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}