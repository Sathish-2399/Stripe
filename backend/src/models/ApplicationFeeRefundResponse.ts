import { Property } from "@tsed/schema";

export class ApplicationFeeRefundResponse {
    @Property()
    application_fee_refund_id!: string;

    @Property()
    application_fee_id!: string;

    @Property()
    refund_id!: string;

    @Property()
    amount!: number;

    @Property()
    currency!: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}