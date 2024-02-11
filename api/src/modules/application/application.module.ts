import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationController } from "./application.controller";
import { ApplicationEntity } from "./application.entity";
import { ApplicationService } from "./application.service";

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
})
export class ApplicationModule {}
