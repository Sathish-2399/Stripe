import { Injectable } from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { PaymentLink } from "@/entities/PaymentLink.js";
import { PaymentLinkRequest } from "@/models/PaymentLinkRequest.js";
import { PaymentLinkResponse } from "@/models/PaymentLinkResponse.js";

@Injectable()
export class PaymentLinkService {

    private paymentLinkRepository = AppDataSource.getRepository(PaymentLink);

    async createPaymentLink(request: PaymentLinkRequest): Promise<PaymentLinkResponse> {

        const paymentLinkId = `plink_${Date.now()}`;
        const amount = request.price * request.quantity;

        const paymentLink = this.paymentLinkRepository.create({
            payment_link_id: paymentLinkId,
            product: request.product,
            price: request.price,
            quantity: request.quantity,
            amount: amount,
            currency: request.currency ?? "usd",
            description: request.description,
            status: "active",
            url: `http://localhost:8083/pay/${paymentLinkId}`
        });

        const savedPaymentLink = await this.paymentLinkRepository.save(paymentLink);

        return {
            payment_link_id: savedPaymentLink.payment_link_id,
            product: savedPaymentLink.product,
            price: savedPaymentLink.price,
            quantity: savedPaymentLink.quantity,
            amount: savedPaymentLink.amount,
            currency: savedPaymentLink.currency,
            description: savedPaymentLink.description,
            status: savedPaymentLink.status,
            url: savedPaymentLink.url,
            created_at: savedPaymentLink.created_at
        };
    }

    async getPaymentLinkById(paymentLinkId: string): Promise<PaymentLinkResponse | null> {

        const paymentLink = await this.paymentLinkRepository.findOne({
            where: { payment_link_id: paymentLinkId }
        });

        if (!paymentLink) {
            return null;
        }

        return {
            payment_link_id: paymentLink.payment_link_id,
            product: paymentLink.product,
            price: paymentLink.price,
            quantity: paymentLink.quantity,
            amount: paymentLink.amount,
            currency: paymentLink.currency,
            description: paymentLink.description,
            status: paymentLink.status,
            url: paymentLink.url,
            created_at: paymentLink.created_at
        };
    }
}