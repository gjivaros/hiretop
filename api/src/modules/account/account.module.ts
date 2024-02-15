import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./account.controller";
import { AccountEntity } from "./account.entity";
import { AccountService } from "./account.service";

@Module({
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
