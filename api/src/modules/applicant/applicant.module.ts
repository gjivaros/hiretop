import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicantEntity } from "./applicant.entity";
import { ApplicantService } from "./applicant.service";

@Module({
  controllers: [],
  providers: [ApplicantService],
  imports: [TypeOrmModule.forFeature([ApplicantEntity])],
  exports: [ApplicantService],
})
export class ApplicantModule {}
