import { Injectable } from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { PaymentLink } from "@/entities/PaymentLink.js";
import { PaymentIntent } from "@/entities/PaymentIntent.js";
import { Charge } from "@/entities/Charge.js";
import { BalanceTransaction } from "@/entities/BalanceTransaction.js";
import { ApplicationFee } from "@/entities/ApplicationFee.js";
import { Refund } from "@/entities/Refund.js";
import { PaymentResponse } from "@/models/PaymentResponse.js";

@Injectable()
export class PaymentService {
    private paymentLinkRepository = AppDataSource.getRepository(PaymentLink);
    private paymentIntentRepository = AppDataSource.getRepository(PaymentIntent);
    private chargeRepository = AppDataSource.getRepository(Charge);
    private balanceTransactionRepository = AppDataSource.getRepository(BalanceTransaction);
    private applicationFeeRepository = AppDataSource.getRepository(ApplicationFee);
    private refundRepository = AppDataSource.getRepository(Refund);

    async makePayment(paymentLinkId: string): Promise<PaymentResponse> {

        const paymentLink = await this.paymentLinkRepository.findOne({
            where: { payment_link_id: paymentLinkId }
        });

        if (!paymentLink) {
            throw new Error("Payment Link not found");
        }

        if (paymentLink.status !== "active") {
            throw new Error("Payment Link is inactive");
        }

        const paymentIntentId = `pi_${Date.now()}`;
        const ApplicationFeeId = `af_${Date.now()}`;
        const chargeId = `ch_${Date.now()}`;
        const balanceTransactionId = `txn_${Date.now()}`;

        const paymentIntent = this.paymentIntentRepository.create({
            payment_intent_id: paymentIntentId,
            payment_link_id: paymentLink.payment_link_id,
            amount: paymentLink.amount,
            currency: paymentLink.currency,
            status: "succeeded"
        });

        const savedPaymentIntent = await this.paymentIntentRepository.save(paymentIntent);
        
        const fee = Number(paymentLink.amount) * 0.10;
        const net = Number(paymentLink.amount) - fee;

        const charge = this.chargeRepository.create({
            charge_id: chargeId,
            payment_intent_id: savedPaymentIntent.payment_intent_id,
            status: "succeeded",
            paid: true
        });

        const savedCharge = await this.chargeRepository.save(charge);

        const ApplicationFee = this.applicationFeeRepository.create({
            application_fee_id: ApplicationFeeId,
            charge_id: chargeId,
            fee: fee,
            status: "succeeded"
        });

        const savedApplicationFee = await this.applicationFeeRepository.save(ApplicationFee);

        const balanceTransaction = this.balanceTransactionRepository.create({
            balance_transaction_id: balanceTransactionId,
            charge_id: savedCharge.charge_id,
            amount: paymentIntent.amount,
            type: "payment",
            status: "available"
        });

        const savedBalanceTransaction = await this.balanceTransactionRepository.save(balanceTransaction);

        return {
            payment_intent_id: savedPaymentIntent.payment_intent_id,
            charge_id: savedCharge.charge_id,
            balance_transaction_id: savedBalanceTransaction.balance_transaction_id,
            payment_link_id: paymentLink.payment_link_id,
            application_fee_id: savedApplicationFee.application_fee_id,
            amount: savedPaymentIntent.amount,
            currency: savedPaymentIntent.currency,
            status: savedPaymentIntent.status,
            created_at: savedPaymentIntent.created_at
        };
    }

        async getPaymentIntent(paymentIntentId: string) {

        const paymentIntent = await this.paymentIntentRepository.findOne({
            where: { payment_intent_id: paymentIntentId }
        });

        if (!paymentIntent) {
            return null;
        }

        return {
            payment_intent_id: paymentIntent.payment_intent_id,
            payment_link_id: paymentIntent.payment_link_id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            created_at: paymentIntent.created_at
        };
    }

    async getCharge(chargeId: string) {

        const charge = await this.chargeRepository.findOne({
            where: { charge_id: chargeId }
        });

        if (!charge) {
            return null;
        }

        return {
            charge_id: charge.charge_id,
            payment_intent_id: charge.payment_intent_id,
            status: charge.status,
            paid: charge.paid,
            created_at: charge.created_at
        };
    }

    async getBalanceTransaction(balanceTransactionId: string) {

        const balanceTransaction = await this.balanceTransactionRepository.findOne({
            where: { balance_transaction_id: balanceTransactionId }
        });

        if (!balanceTransaction) {
            return null;
        }

        return {
            balance_transaction_id: balanceTransaction.balance_transaction_id,
            charge_id: balanceTransaction.charge_id,
            amount: balanceTransaction.amount,
            type: balanceTransaction.type,
            status: balanceTransaction.status,
            created_at: balanceTransaction.created_at
        };
    }

    async getAllTransaction() {
        const paymentIntents = await this.paymentIntentRepository.find({
            order: { created_at: "DESC" }
        });

        const result = [];

        for (const paymentIntent of paymentIntents) {
            const charge = await this.chargeRepository.findOne({
                where: { payment_intent_id: paymentIntent.payment_intent_id }
            });

            const refunds = charge
                ? await this.refundRepository.find({
                    where: { charge_id: charge.charge_id }
                })
                : [];

            const total_refunded = refunds.reduce(
                (total, refund) => total + Number(refund.amount ?? 0),
                0
            );

            result.push({
                payment_intent_id: paymentIntent.payment_intent_id,
                charge_id: charge?.charge_id,
                payment_link_id: paymentIntent.payment_link_id,
                amount: Number(paymentIntent.amount),
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                refundable_amount: Math.max(Number(paymentIntent.amount) - total_refunded, 0),
                total_refunded,
                created_at: paymentIntent.created_at
            });
        }

        return result;
    }
}
