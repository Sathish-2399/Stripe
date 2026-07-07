import { Controller } from "@tsed/di";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { MerchantService } from "@/services/MerchantService.js";
import { MerchantSignUpRequest } from "@/models/MerchantSignUpRequest.js";
import { LoginRequest } from "@/models/LoginRequest.js";

@Controller("/merchant")
export class MerchantController {

    constructor(private merchantService: MerchantService) {}

    @Post("/sign-up")
    async signup(
        @BodyParams() request: MerchantSignUpRequest
    ) {
        return await this.merchantService.signup(request);
    }

    @Post("/login")
    async login(
        @BodyParams() request: LoginRequest
    ) {
        return await this.merchantService.login(request);
    }

    @Get("/:id")
    async getMerchantById(
        @PathParams("id") id: string
    ) {
        return await this.merchantService.getMerchantById(id);
    }
}