import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { hashPassword } from "src/helpers/password-encryption";
import { EntityManager, Repository } from "typeorm";
import { LoginDto } from "./account.dto";
import { AccountEntity } from "./account.entity";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>
  ) {}

  async create(createAccountDto: LoginDto, tx: EntityManager) {
    return tx.getRepository(AccountEntity).save({
      ...createAccountDto,
      password: await hashPassword(createAccountDto.password),
    });
  }

  async findOne(email: string) {
    const account = await this.accountRepo.findOne({ where: { email } });

    if (!account)
      throw new UnauthorizedException("email or password incorrect");

    return account;
  }
}
