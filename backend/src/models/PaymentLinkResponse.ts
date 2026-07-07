import { Property } from "@tsed/schema";

export class PaymentLinkResponse {

    @Property()
    payment_link_id!: string;

    @Property()
    product!: string;

    @Property()
    price!: number;

    @Property()
    quantity!: number;

    @Property()
    amount!: number;

    @Property()
    currency!: string;

    @Property()
    description?: string;

    @Property()
    status!: string;

    @Property()
    url!: string;

    @Property()
    created_at!: Date;
}