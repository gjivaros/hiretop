import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { CreateEnterpriseDto } from "./create-enterprise.inputs";
import { EnterpriseEntity } from "./enterprise.entity";

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private readonly enterpriseRepo: Repository<EnterpriseEntity>
  ) {}
  create(createEnterpriseDto: CreateEnterpriseDto, tx: EntityManager) {
    return tx.getRepository(EnterpriseEntity).save(createEnterpriseDto);
  }

  async findOne(id: string) {
    const row = await this.enterpriseRepo.findOne({ where: { id } });

    if (!row) throw new UnauthorizedException();
    return { ...row, isCompleted: row.isCompleted };
  }
}
