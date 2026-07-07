import { Property } from "@tsed/schema";

export class ApplicationFeeResponse{
    @Property()
    application_fee_id!: string;

    @Property()
    charge_id!: string;

    @Property()
    fee!: number;

    @Property()
    status!: string;

    @Property()
    created_at!: Date;
}