import { Injectable } from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { AppDataSource } from "@/config/database.js";
import { Dispute } from "@/entities/Dispute.js";
import { BalanceTransaction } from "@/entities/BalanceTransaction.js";
import { Charge } from "@/entities/Charge.js";
import { PaymentIntent } from "@/entities/PaymentIntent.js";
import { Refund } from "@/entities/Refund.js";
import { DisputeRequest } from "@/models/DisputeRequest.js";
import { DisputeResponse } from "@/models/DisputeResponse.js";

@Injectable()
export class DisputeService {

    private disputeRepository = AppDataSource.getRepository(Dispute);
    private balanceTransactionRepository = AppDataSource.getRepository(BalanceTransaction);
    private chargeRepository = AppDataSource.getRepository(Charge);
    private paymentIntentRepository = AppDataSource.getRepository(PaymentIntent);
    private refundRepository = AppDataSource.getRepository(Refund);

    async createDispute(request: DisputeRequest): Promise<DisputeResponse> {

        const payment_intent_id = await this.getPaymentIntentId(request.charge_id);

        const payment_intent = await this.paymentIntentRepository.findOne({where: { payment_intent_id: payment_intent_id }});

        if(!payment_intent){
            throw new Error("Invalid payment intent id is not valid");
        }

        const disputes = await this.disputeRepository.findOne({
            where: {charge_id: request.charge_id}
        });

        if(disputes){
            throw new Error("Already for this transaction arise the dispute");
        }

        const refund = await this.refundRepository.findOne({
            where: {charge_id: request.charge_id}
        });

        if(refund){
            throw new Error("Already for this transaction arise the refund");
        }
        
        const dispute = this.disputeRepository.create({
            dispute_id: `dp_${Date.now()}`,
            charge_id: request.charge_id,
            amount: payment_intent?.amount,
            reason: request.reason,
            evidence: request.evidence,
            status: "needs_response"
        });

        const savedDispute = await this.disputeRepository.save(dispute);


        const balance_transaction = await this.balanceTransactionRepository.findOne({
            where: {charge_id: request.charge_id, type: "payment"},
        });

        const balanceTransaction = this.balanceTransactionRepository.create({
            balance_transaction_id: `txn_${Date.now()}`,
            charge_id: balance_transaction?.charge_id,
            amount: -balance_transaction?.amount!,
            type: "dispute",
            status: "available"
        });

        await this.balanceTransactionRepository.save(balanceTransaction);

        return {
            dispute_id: savedDispute.dispute_id,
            charge_id: savedDispute.charge_id,
            amount: savedDispute.amount,
            reason: savedDispute.reason,
            evidence: savedDispute.evidence,
            status: savedDispute.status,
            created_at: savedDispute.created_at
        };
    }

    async getDisputeById(disputeId: string): Promise<DisputeResponse | null> {

        const dispute = await this.disputeRepository.findOne({
            where: { dispute_id: disputeId }
        });

        if (!dispute) {
            return null;
        }

        return {
            dispute_id: dispute.dispute_id,
            charge_id: dispute.charge_id,
            amount: dispute.amount,
            reason: dispute.reason,
            evidence: dispute.evidence,
            status: dispute.status,
            created_at: dispute.created_at
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

    async getAllDisputes(){
        const dispute = await this.disputeRepository.find();

        if(!dispute){
            throw new Error("No dispute is exist");
        }

        return dispute;
    }
}