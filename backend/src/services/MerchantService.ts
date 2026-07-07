import { Injectable } from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { Merchant } from "@/entities/Merchant.js";
import { MerchantSignUpRequest } from "@/models/MerchantSignUpRequest.js";
import { LoginRequest } from "@/models/LoginRequest.js";
import { MerchantResponse } from "@/models/MerchantResponse.js";

@Injectable()
export class MerchantService {

    private merchantRepository = AppDataSource.getRepository(Merchant);

    async signup(request: MerchantSignUpRequest): Promise<MerchantResponse> {

        const email = await this.merchantRepository.findOne({
            where: { email: request.email }
        });

        if (email) {
            throw new Error("Merchant already exists");
        }

        const merchant = this.merchantRepository.create({
            merchant_id: `mer_${Date.now()}`,
            business_name: request.business_name,
            email: request.email,
            password: request.password,
            phone: request.phone,
            account_number: request.account_number,
            ifsc_code: request.ifsc_code,
            bank_name: request.bank_name,
            status: "active"
        });

        const savedMerchant = await this.merchantRepository.save(merchant);

        return {
            merchant_id: savedMerchant.merchant_id,
            business_name: savedMerchant.business_name,
            email: savedMerchant.email,
            phone: savedMerchant.phone,
            account_number: savedMerchant.account_number,
            ifsc_code: savedMerchant.ifsc_code,
            bank_name: savedMerchant.bank_name,
            status: savedMerchant.status,
            created_at: savedMerchant.created_at
        };
    }

    async login(request: LoginRequest): Promise<MerchantResponse> {

        const merchant = await this.merchantRepository.findOne({
            where: { email: request.email }
        });

        if (!merchant) {
            throw new Error("Merchant does not exist. Please sign up.");
        }

        if (merchant.password !== request.password) {
            throw new Error("Invalid password");
        }

        return {
            merchant_id: merchant.merchant_id,
            business_name: merchant.business_name,
            email: merchant.email,
            phone: merchant.phone,
            account_number: merchant.account_number,
            ifsc_code: merchant.ifsc_code,
            bank_name: merchant.bank_name,
            status: merchant.status,
            created_at: merchant.created_at
        };
    }

    async getMerchantById(id: string): Promise<MerchantResponse | null> {

        const merchant = await this.merchantRepository.findOne({
            where: { merchant_id: id }
        });

        if (!merchant) {
            return null;
        }

        return {
            merchant_id: merchant.merchant_id,
            business_name: merchant.business_name,
            email: merchant.email,
            phone: merchant.phone,
            account_number: merchant.account_number,
            ifsc_code: merchant.ifsc_code,
            bank_name: merchant.bank_name,
            status: merchant.status,
            created_at: merchant.created_at
        };
    }
}