import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnterpriseEntity } from "./enterprise.entity";
import { EnterpriseService } from "./enterprise.service";

@Module({
  controllers: [],
  providers: [EnterpriseService],
  imports: [TypeOrmModule.forFeature([EnterpriseEntity])],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
