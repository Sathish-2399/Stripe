import { Property } from "@tsed/schema";

export class LoginRequest {
    @Property()
    email!: string

    @Property()
    password!: string
}