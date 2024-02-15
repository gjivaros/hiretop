import { Body, Controller, Patch, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { UpdateAccountDto } from "./account.dto";
import { AccountEntity } from "./account.entity";
import { AccountService } from "./account.service";

@ApiTags("Account")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("Account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch()
  async updateAccountInformations(
    @Request() req: Request & { user: AccountEntity },
    @Body() inputs: UpdateAccountDto
  ) {
    await this.accountService.updateInformations(req.user.id, inputs);
    return {
      code: "OK",
    };
  }
}
