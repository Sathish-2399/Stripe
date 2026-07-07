import { Controller} from "@tsed/di";
import { BodyParams,PathParams } from "@tsed/platform-params";
import { Post, Get } from "@tsed/schema";
import { RefundService } from "../services/RefundService.js"
import { RefundRequest } from "@/models/RefundRequest.js";

@Controller("/create")
export class RefundController{
    constructor(private refundService: RefundService) {}

    @Post("/refund")
    async createRefund(
        @BodyParams() request: RefundRequest
    ){
        return await this.refundService.createRefund(request);
    }

    @Get("/refund/:id")
    async getRefundById(
        @PathParams("id") id:string
    ){
        return await this.refundService.getRefundById(id);
    }

    @Get("/refund/all")
    async getAllRefunds(){
        return await this.refundService.getAllRefunds();
    }

}