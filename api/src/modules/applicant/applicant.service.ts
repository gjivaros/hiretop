import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { ApplicantEntity } from "./applicant.entity";
import { CreateApplicantDto } from "./create-applicant.inputs";

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantEntity)
    private readonly applicantRepo: Repository<ApplicantEntity>
  ) {}
  create(createApplicantDto: CreateApplicantDto, tx: EntityManager) {
    return tx.getRepository(ApplicantEntity).save(createApplicantDto);
  }

  async findOne(id: string) {
    const row = await this.applicantRepo.findOne({ where: { id } });

    if (!row) throw new UnauthorizedException();
    return { ...row, isCompleted: row.isCompleted };
  }
}
