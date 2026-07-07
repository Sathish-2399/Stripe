import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get } from "@tsed/schema";
import { ApplicationFeeService } from "../services/ApplicationFeeService.js";

@Controller("/application-fee")
export class ApplicationFeeController {
    constructor(private applicationFeeService: ApplicationFeeService) {}

    @Get("/:id")
    async getApplicationFeeById(
        @PathParams("id") id:string
    ) {
        return await this.applicationFeeService.getApplicationFeeById(id);
    }
}