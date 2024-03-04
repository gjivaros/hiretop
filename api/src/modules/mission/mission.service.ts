import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MissionEntity } from "./mission.entity";
import {
  CreateMissionDto,
  MissionStatus,
  UpdateMissionDto,
} from "./mission.inputs";

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(MissionEntity)
    private readonly missionRepo: Repository<MissionEntity>
  ) {}

  create(createMissionDto: CreateMissionDto & { enterpriseId: string }) {
    const salary: any = JSON.stringify(createMissionDto.salary);
    return this.missionRepo.save({ ...createMissionDto, salary });
  }

  findAll(options: { enterpriseId: string; status?: MissionStatus }) {
    return this.missionRepo.find({ where: options });
  }

  findOne(id: { enterpriseId: string; id: string }) {
    return this.missionRepo.findOne({ where: id });
  }

  async update(
    id: { enterpriseId: string; id: string },
    updateMissionDto: UpdateMissionDto
  ) {
    await this.missionRepo.update(id, updateMissionDto);
    return this.findOne(id);
  }

  async remove(id: { enterpriseId: string; id: string }) {
    await this.missionRepo.update(id, { status: "canceled" });
    return this.findOne(id);
  }
}
