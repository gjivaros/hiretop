import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { appLog } from "src/context";
import { comparePassword } from "src/helpers/password-encryption";
import { DataSource } from "typeorm";
import { LoginDto } from "../account/account.dto";
import { AccountService } from "../account/account.service";
import { ApplicantService } from "../applicant/applicant.service";
import { EnterpriseService } from "../enterprise/enterprise.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly applicantService: ApplicantService,
    private readonly enterpriseService: EnterpriseService,
    private readonly datasource: DataSource
  ) {}

  async validateUser({ email, password }: LoginInput) {
    try {
      const user = await this.accountService.findOne(email);

      if (!user) {
        throw new UnauthorizedException({
          code: "INVALID_CREDENTIALD",
          message: "username or password incorrect",
        });
      }

      if (await comparePassword(password, user.password)) {
        return user;
      }

      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALD",
        message: "username or password incorrect",
      });
    } catch (error) {
      appLog.error(error);
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALD",
        message: "username or password incorrect",
      });
    }
  }

  async register(payload: LoginDto) {
    let account;
    await this.datasource.transaction(async (tx) => {
      const { password, ...others } = await this.accountService.create(
        payload,
        tx
      );

      account = others;

      await this.applicantService.create({ id: account.id }, tx);

      await this.enterpriseService.create({ id: account.id }, tx);
    });

    return account;
  }

  async login(user: LoginInput): Promise<LoginSuccess | LoginFaild> {
    const payload = await this.validateUser(user);

    if (payload) {
      return {
        id: payload.id,
        email: payload.email,
        token: this.jwtService.sign({
          email: payload.email,
          id: payload.id,
        }),
      };
    }

    return {
      message: "Unauthorized",
      statusCode: 401,
    };
  }

  getUserByEmail(email: string) {
    return this.accountService.findOne(email);
  }

  verifyToken(token: string) {
    try {
      const user = this.jwtService.verify(token);
      console.log("user", user);
      return true;
    } catch (error) {
      appLog.error(error);
      return false;
    }
  }

  async getInfo(accountId: string) {
    return {
      enterprise: await this.enterpriseService.findOne(accountId),
      applicant: await this.applicantService.findOne(accountId),
    };
  }
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginSuccess {
  id: string;
  email: string;
  token: string;
}

export interface LoginFaild {
  statusCode: 401;
  message: "Unauthorized";
}
