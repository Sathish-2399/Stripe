import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get } from "@tsed/schema";
import { ApplicationFeeRefundService } from "@/services/ApplicationFeeRefundService.js";

@Controller("/application-fee-refund")
export class ApplicationFeeRefundController{

    constructor(private applicationFeeRefundService: ApplicationFeeRefundService) {}

    @Get("/:id")
    async getApplicationFeeRefundById(
        @PathParams("id") id: string
    ){
        return await this.applicationFeeRefundService.getApplicationFeeRefundById(id);
    }
}