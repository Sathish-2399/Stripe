import { Property } from "@tsed/schema";

export class DisputeRequest {

    @Property()
    payment_intent_id?: string;

    @Property()
    charge_id?: string;

    @Property()
    amount?: number;

    @Property()
    currency?: string;

    @Property()
    reason?: string;

    @Property()
    evidence?: string;
}