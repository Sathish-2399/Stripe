import { Property } from "@tsed/schema";

export class RefundRequest {

    @Property()
    charge_id! : string;

    @Property()
    amount? : number;

    @Property()
    reason? : string
}