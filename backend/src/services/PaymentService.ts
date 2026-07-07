import { Injectable } from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { PaymentLink } from "@/entities/PaymentLink.js";
import { PaymentIntent } from "@/entities/PaymentIntent.js";
import { Charge } from "@/entities/Charge.js";
import { BalanceTransaction } from "@/entities/BalanceTransaction.js";
import { ApplicationFee } from "@/entities/ApplicationFee.js";
import { PaymentResponse } from "@/models/PaymentResponse.js";

@Injectable()
export class PaymentService {
    private paymentLinkRepository = AppDataSource.getRepository(PaymentLink);
    private paymentIntentRepository = AppDataSource.getRepository(PaymentIntent);
    private chargeRepository = AppDataSource.getRepository(Charge);
    private balanceTransactionRepository = AppDataSource.getRepository(BalanceTransaction);
    private applicationFeeRepository = AppDataSource.getRepository(ApplicationFee);

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
            amount: savedPaymentIntent.amount,
            currency: savedPaymentIntent.currency,
            status: "succeeded",
            paid: true
        });

        const savedCharge = await this.chargeRepository.save(charge);

        const ApplicationFee = this.applicationFeeRepository.create({
            application_fee_id: ApplicationFeeId,
            payment_link_id: paymentLink.payment_link_id,
            payment_intent_id: paymentIntentId,
            charge_id: chargeId,
            amount: paymentLink.amount,
            fee: fee,
            net: net,
            currency: paymentLink.currency,
            status: "succeeded"
        });

        const savedApplicationFee = await this.applicationFeeRepository.save(ApplicationFee);

        const balanceTransaction = this.balanceTransactionRepository.create({
            balance_transaction_id: balanceTransactionId,
            payment_intent_id: savedPaymentIntent.payment_intent_id,
            charge_id: savedCharge.charge_id,
            amount: savedCharge.amount,
            fee: fee,
            net: net,
            currency: savedCharge.currency,
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
            amount: charge.amount,
            currency: charge.currency,
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
            payment_intent_id: balanceTransaction.payment_intent_id,
            charge_id: balanceTransaction.charge_id,
            amount: balanceTransaction.amount,
            fee: balanceTransaction.fee,
            net: balanceTransaction.net,
            currency: balanceTransaction.currency,
            type: balanceTransaction.type,
            status: balanceTransaction.status,
            created_at: balanceTransaction.created_at
        };
    }

    async getAllTransaction() {
        const payment_intent = await this.paymentIntentRepository.find();
        return payment_intent;
    }
}