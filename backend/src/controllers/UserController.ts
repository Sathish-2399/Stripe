import { Controller } from "@tsed/di";
import { PathParams, BodyParams} from "@tsed/platform-params";
import { Get,Post } from "@tsed/schema";
import { UserService } from "../services/UserService.js";
import { UserSignUpRequest } from "@/models/UserSignUpRequest.js";
import { LoginRequest } from "../models/LoginRequest.js";

@Controller("/user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post("/sign-up")
    async signup(
        @BodyParams() request: UserSignUpRequest
    ) {
        return await this.userService.signup(request);
    }

    @Post("/login")
    async login(
        @BodyParams() request: LoginRequest
    ) {
        return await this.userService.login(request);
    }

    @Get("/:id")
    async getUserById (
        @PathParams() id: string
    ) {
        return await this.userService.getUserById(id);
    }


}