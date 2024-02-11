import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";

import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/context";
import { AccountModule } from "../account/account.module";
import { ApplicantModule } from "../applicant/applicant.module";
import { EnterpriseModule } from "../enterprise/enterprise.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    AccountModule,
    PassportModule,
    ApplicantModule,
    EnterpriseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
