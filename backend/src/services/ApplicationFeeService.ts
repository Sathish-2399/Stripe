import { Injectable } from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { ApplicationFee } from "@/entities/ApplicationFee.js";
import { ApplicationFeeResponse } from "@/models/ApplicationFeeResponse.js";

@Injectable()
export class ApplicationFeeService {
    private applicationFeeRepository = AppDataSource.getRepository(ApplicationFee);

    async getApplicationFeeById(id: string): Promise<ApplicationFeeResponse | null> {
        const applicationFee = await this.applicationFeeRepository.findOne({
            where: {application_fee_id:id}
        });

        if(!applicationFee) {
            return null;
        }

        return {
            application_fee_id: id,
            payment_intent_id: applicationFee.payment_intent_id,
            charge_id: applicationFee.charge_id,
            amount: applicationFee.amount,
            fee: applicationFee.fee,
            net: applicationFee.net,
            currency: applicationFee.currency,
            status: applicationFee.status,
            created_at: applicationFee.created_at
        }
    }
}