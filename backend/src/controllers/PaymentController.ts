import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Post, Get } from "@tsed/schema";

import { PaymentService } from "@/services/PaymentService.js";

@Controller("/pay")
export class PaymentController {

    constructor(private paymentService: PaymentService) {}

    @Post("/:payment_link_id")
    async makePayment(
        @PathParams("payment_link_id") paymentLinkId: string,
    ) {
        return await this.paymentService.makePayment(paymentLinkId);
    }

    @Get("/payment-intent/:id")
    async getPaymentIntent(
        @PathParams("id") id: string
    ) {
        return await this.paymentService.getPaymentIntent(id);
    }

    @Get("/charge/:id")
    async getCharge(
        @PathParams("id") id: string
    ) {
        return await this.paymentService.getCharge(id);
    }

    @Get("/balance-transaction/:id")
    async getBalanceTransaction(
        @PathParams("id") id: string
    ) {
        return await this.paymentService.getBalanceTransaction(id);
    }

    @Get("/payment-intents")
    async getAllTransaction() {
        return await this.paymentService.getAllTransaction();
    }
}
