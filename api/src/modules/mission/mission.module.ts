import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MissionController } from "./mission.controller";
import { MissionEntity } from "./mission.entity";
import { MissionService } from "./mission.service";

@Module({
  controllers: [MissionController],
  providers: [MissionService],
  imports: [TypeOrmModule.forFeature([MissionEntity])],
})
export class MissionModule {}
