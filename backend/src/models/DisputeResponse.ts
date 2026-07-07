import { Property,Required } from "@tsed/schema";

export class DisputeResponse {

    @Property()
    dispute_id!: string;

    @Property()
    payment_intent_id?: string;

    @Required()
    @Property()
    charge_id?: string;

    @Property()
    amount!: number;

    @Property()
    currency!: string;

    @Property()
    reason?: string;

    @Property()
    status!: string;

    @Property()
    evidence?: string;

    @Property()
    created_at!: Date;
}