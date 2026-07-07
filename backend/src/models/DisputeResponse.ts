import { Property,Required } from "@tsed/schema";

export class DisputeResponse {

    @Property()
    dispute_id!: string;

    @Property()
    charge_id?: string;

    @Property()
    amount!: number;

    @Property()
    reason?: string;

    @Property()
    status!: string;

    @Property()
    evidence?: string;

    @Property()
    created_at!: Date;
}