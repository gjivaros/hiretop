import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { CreateEnterpriseDto } from "./create-enterprise.inputs";
import { EnterpriseEntity } from "./enterprise.entity";

@Injectable()
export class EnterpriseService {
  create(createEnterpriseDto: CreateEnterpriseDto, tx: EntityManager) {
    return tx.getRepository(EnterpriseEntity).save(createEnterpriseDto);
  }
}
