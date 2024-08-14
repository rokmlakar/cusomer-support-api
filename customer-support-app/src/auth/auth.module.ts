import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { BasicAuthGuard } from "./authGuard";
import { UserModule } from "../user/user.module";


@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, BasicAuthGuard]
})
export class AuthModule {}