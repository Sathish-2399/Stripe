import { Property } from "@tsed/schema";

export class RefundResponse {

    @Property()
    refund_id!: string;

    @Property()
    charge_id?: string;

    @Property()
    amount?: number;

    @Property()
    reason?: string;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}