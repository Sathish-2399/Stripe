import { Property } from "@tsed/schema";

export class RefundRequest {
    @Property()
    payment_intent_id? : string;

    @Property()
    charge_id? : string;

    @Property()
    amount? : number;

    @Property()
    reason? : string
}