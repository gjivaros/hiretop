import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/helpers/password-encryption";
import { DataSource, EntityManager, Repository } from "typeorm";
import { ApplicantEntity } from "../applicant/applicant.entity";
import { EnterpriseEntity } from "../enterprise/enterprise.entity";
import { LoginDto, UpdateAccountDto } from "./account.dto";
import { AccountEntity } from "./account.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
    private readonly datasource: DataSource
  ) {}

  async create(createAccountDto: LoginDto, tx: EntityManager) {
    return tx.getRepository(AccountEntity).save({
      ...createAccountDto,
      password: await hashPassword(createAccountDto.password),
    });
  }

  async findOne(email: string) {
    const account = await this.accountRepo.findOne({ where: { email } });
    return account;
  }

  async updateInformations(id: string, inputs: UpdateAccountDto) {
    await this.datasource.transaction(async (tx) => {
      await tx.getRepository(EnterpriseEntity).update(
        {
          id,
        },
        inputs.enterprise
      );

      await tx.getRepository(ApplicantEntity).update({ id }, inputs.applicant);
    });
  }
}
