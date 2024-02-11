import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApplicationEntity } from "./application.entity";
import {
  ApplicationStatus,
  CreateApplicationDto,
  UpdateApplicationDto,
} from "./application.inputs";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepo: Repository<ApplicationEntity>
  ) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationRepo.save(createApplicationDto);
  }

  findAll(option: { applicantId: string; status: ApplicationStatus }) {
    return this.applicationRepo.find({ where: option });
  }

  async findOne(id: { id: string; applicantId: string }) {
    const application = await this.applicationRepo.findOne({ where: id });

    if (!application)
      throw new BadRequestException({
        code: "NOT_FOUND",
        description: "application not found",
      });

    return application;
  }

  async update(
    id: { id: string; applicantId: string },
    updateApplicationDto: UpdateApplicationDto
  ) {
    await this.applicationRepo.update(id, updateApplicationDto);
    return this.findOne(id);
  }

  async remove(id: { id: string; applicantId: string }) {
    await this.applicationRepo.update(id, { status: "canceled" });
    return id;
  }
}
