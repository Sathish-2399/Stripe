import { Property, Required } from "@tsed/schema";

export class PaymentLinkRequest {

    @Required()
    @Property()
    product!: string;

    @Required()
    @Property()
    price!: number;

    @Required()
    @Property()
    quantity!: number;

    @Property()
    currency!: string;

    @Property()
    description?: string;
}