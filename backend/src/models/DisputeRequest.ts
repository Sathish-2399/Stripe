import { Property } from "@tsed/schema";

export class DisputeRequest {

    @Property()
    charge_id!: string;

    @Property()
    amount?: number;

    @Property()
    currency?: string;

    @Property()
    reason?: string;

    @Property()
    evidence?: string;
}