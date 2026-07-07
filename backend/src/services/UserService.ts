import {Injectable} from "@tsed/di";
import { AppDataSource } from "@/config/database.js";
import { User } from "@/entities/User.js";
import { UserSignUpRequest } from "@/models/UserSignUpRequest.js";
import { LoginRequest } from "../models/LoginRequest.js";
import { UserResponse } from "../models/UserResponse.js";

@Injectable()
export class UserService{
    private userRepository = AppDataSource.getRepository(User);

    async signup(request: UserSignUpRequest): Promise<UserResponse> {
        
        const email = await this.userRepository.findOne({
            where:{email:request.email}
        });

        if(email){
            throw new Error("User already exist");
        }
   
        const user = this.userRepository.create({
            user_id: `user_${Date.now()}`,
            name: request.name,
            email: request.email,
            phone: request.phone,
            password: request.password,
            status: "active"
        });

        const savedUser = await this.userRepository.save(user);

        return {
            user_id: savedUser.user_id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            status: savedUser.status,
            created_at: savedUser.created_at
        };
    }

    async login(request: LoginRequest): Promise<UserResponse> {
        const user = await this.userRepository.findOne({
            where:{email:request.email}
        });

        if(!user){
            throw new Error("User not exist please sign up to continue");
        }

        return {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
            created_at: user.created_at
        };
    }

    async getUserById(id: string): Promise<UserResponse> {
        const user = await this.userRepository.findOne({
            where: {user_id:id}
        });

        if(!user){
            throw new Error("User not exist");
        }

        return {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
            created_at: user.created_at
        };
    }
}