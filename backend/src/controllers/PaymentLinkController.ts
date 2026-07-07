import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";

import { PaymentLinkService } from "@/services/PaymentLinkService.js";
import { PaymentLinkRequest } from "@/models/PaymentLinkRequest.js";

@Controller("/create")
export class PaymentLinkController {

    constructor(private paymentLinkService: PaymentLinkService) {}

    @Post("/payment-link")
    async createPaymentLink(
        @BodyParams() request: PaymentLinkRequest
    ) {
        return await this.paymentLinkService.createPaymentLink(request);
    }

    @Get("/payment-link/:id")
    async getPaymentLinkById(
        @PathParams("id") id: string
    ) {
        return await this.paymentLinkService.getPaymentLinkById(id);
    }

}