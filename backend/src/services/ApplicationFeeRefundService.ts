import { AppDataSource } from "@/config/database.js";
import { Injectable } from "@tsed/di";
import { ApplicationFeeRefund } from "@/entities/ApplicationFeeRefund.js";
import { ApplicationFeeRefundResponse } from "@/models/ApplicationFeeRefundResponse.js";
@Injectable()
export class ApplicationFeeRefundService{
    private applicationFeeRefundRepository = AppDataSource.getRepository(ApplicationFeeRefund);

    async getApplicationFeeRefundById(id: string) : Promise<ApplicationFeeRefundResponse | null> {
        
        const applicationFeeRefund = await this.applicationFeeRefundRepository.findOne({
            where: {application_fee_refund_id: id}
        });

        if(!applicationFeeRefund) {
            return null;
        }

        return {
            application_fee_refund_id: id,
            application_fee_id: applicationFeeRefund.application_fee_id,
            amount: applicationFeeRefund.amount,
            status: applicationFeeRefund.status,
            created_at: applicationFeeRefund.created_at
        };
    }
}