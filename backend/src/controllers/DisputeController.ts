import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";

import { DisputeService } from "@/services/DisputeService.js";
import { DisputeRequest } from "@/models/DisputeRequest.js";

@Controller("/create")
export class DisputeController {

    constructor(private disputeService: DisputeService) {}

    @Post("/dispute")
    async createDispute(
        @BodyParams() request: DisputeRequest
    ) {
        return await this.disputeService.createDispute(request);
    }

    @Get("/dispute/:id")
    async getDisputeById(
        @PathParams("id") id: string
    ) {
        return await this.disputeService.getDisputeById(id);
    }

}