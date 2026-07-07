import { Injectable } from "@tsed/di";
import { AppDataSource } from "../config/database.js";
import { Refund } from "../entities/Refund.js";
import { PaymentIntent } from "../entities/PaymentIntent.js";
import { Charge } from "../entities/Charge.js";
import { ApplicationFee } from "@/entities/ApplicationFee.js";
import { ApplicationFeeRefund } from "@/entities/ApplicationFeeRefund.js";
import { BalanceTransaction } from "@/entities/BalanceTransaction.js";
import { Dispute } from "@/entities/Dispute.js";
import { RefundResponse } from "@/models/RefundResponse.js";
import { RefundRequest } from "../models/RefundRequest.js";
import { BadRequest } from "@tsed/exceptions";

@Injectable()
export class RefundService{

    private refundRepository = AppDataSource.getRepository(Refund);
    private paymentIntentRepository = AppDataSource.getRepository(PaymentIntent);
    private chargeRepository = AppDataSource.getRepository(Charge);
    private applicationFeeRepository = AppDataSource.getRepository(ApplicationFee);
    private applicationFeeRefundRepository = AppDataSource.getRepository(ApplicationFeeRefund);
    private balanceTransactionRepository = AppDataSource.getRepository(BalanceTransaction);
    private disputeRepository = AppDataSource.getRepository(Dispute);

    async createRefund(request: RefundRequest ): Promise<RefundResponse | null>{

        if(!request.payment_intent_id && !request.charge_id){
            throw new BadRequest("Either payment_intent_id or charge_id is need to be provided");
        }

        const payment_intent_id = !request.payment_intent_id && request.charge_id
            ? await this.getPaymentIntentId(request.charge_id)
            : request.payment_intent_id;

        const charge_id = !request.charge_id && request.payment_intent_id 
            ? await this.getChargeId(request.payment_intent_id)
            : request.charge_id;
        
        const payment_intent = await this.paymentIntentRepository.findOne({where: { payment_intent_id: payment_intent_id }});
       // const charge = await this.chargeRepository.findOne({ where: {charge_id: charge_id} });
        
        const dispute = await this.disputeRepository.findOne({
            where: {payment_intent_id: payment_intent_id}
        });

        if(dispute){
            throw new Error("Dispute is rised for the transaction");
        }

        const refunds = await this.refundRepository.find({
            where: {payment_intent_id: payment_intent?.payment_intent_id}
        });

        const totalRefundAmount = refunds.reduce(
            (total,refund) => total + Number(refund.amount), 0
        );

        if(request.amount) {
            if(payment_intent && request.amount+totalRefundAmount > payment_intent.amount) {
                throw new Error("Refund amount should be less than transaction amount");
            }
        }

        const refundAmount = request.amount ?? payment_intent?.amount;
        const refund_id = `re_${Date.now()}`;

        const refund = this.refundRepository.create({
            refund_id: refund_id,
            payment_intent_id: payment_intent_id ,
            charge_id: charge_id ,
            amount: request.amount ?? refundAmount,
            reason: request.reason,
            status: "succeeded"
        });

        const savedRefund = await this.refundRepository.save(refund);

        const application_fee = await this.applicationFeeRepository.findOne({
            where: {payment_intent_id: payment_intent_id}
        });
        
        
        const applicationFeeRefund = this.applicationFeeRefundRepository.create({
            application_fee_refund_id: `afr_${Date.now()}`,
            application_fee_id: application_fee?.application_fee_id,
            refund_id: refund_id,
            amount: application_fee?.fee,
            currency: application_fee?.currency,
            status: "succeeded"
        });

        const savedApplicationFeeRefund = await this.applicationFeeRefundRepository.save(applicationFeeRefund);

        const balance_transaction = await this.balanceTransactionRepository.findOne({
            where: {payment_intent_id: payment_intent_id, type: "payment"},
        });

        const balanceTransaction = this.balanceTransactionRepository.create({
            balance_transaction_id: `txn_${Date.now()}`,
            payment_intent_id: savedRefund.payment_intent_id,
            charge_id: savedRefund.charge_id,
            amount: -savedRefund.amount!,
            fee: 0,
            net: -savedRefund.amount!,
            currency: balance_transaction?.currency,
            type: "refund",
            status: "available"
        });

        await this.balanceTransactionRepository.save(balanceTransaction);

        return {
            refund_id: savedRefund.refund_id,
            payment_intent_id: savedRefund.payment_intent_id,
            charge_id: savedRefund.charge_id,
            application_fee_refund_id: savedApplicationFeeRefund.application_fee_refund_id,
            amount: savedRefund.amount,
            reason: savedRefund.reason,
            status: savedRefund.status,
            created_at: savedRefund.created_at
        };
 
    }

    async getRefundById(refundId: string): Promise<RefundResponse | null>{
        const refund = await this.refundRepository.findOne({
             where: { refund_id: refundId }
        });

        if(!refund) {
            return null;
        }

        return {
            refund_id: refund.refund_id,
            payment_intent_id: refund.payment_intent_id,
            charge_id: refund.charge_id,
            amount: refund.amount,
            reason: refund.reason,
            status: refund.status,
            created_at: refund.created_at
        };
    }

    async getPaymentIntentId(charge_id:string) : Promise<string>{
        const charge = await this.chargeRepository.findOne({
            where: {charge_id: charge_id}
        });

        if(!charge){
            throw new BadRequest("Charge is not found");
        }

        return charge?.payment_intent_id;
    }

    async getChargeId(payment_intent_id:string) : Promise<string>{
        const charge = await this.chargeRepository.findOne({
            where: {payment_intent_id: payment_intent_id}
        });

        if(!charge) {
            throw new BadRequest("Charge is not found");
        }

        return charge?.charge_id;
    }
}

