import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ApplicantEntity } from "./applicant.entity";
import { CreateApplicantDto } from "./create-applicant.inputs";

@Injectable()
export class ApplicantService {
  create(createApplicantDto: CreateApplicantDto, tx: EntityManager) {
    return tx.getRepository(ApplicantEntity).save(createApplicantDto);
  }
}
