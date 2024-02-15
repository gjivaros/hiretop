import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../account/account.dto";
import { AccountEntity } from "../account/account.entity";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "./jwt.auth.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(@Body() loginInput: LoginDto) {
    const user = await this.authservice.getUserByEmail(loginInput.email);

    if (!user) {
      await this.authservice.register(loginInput);
    }
    return this.authservice.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@Request() req: Request & { user: AccountEntity }) {
    const accountInfo = await this.authservice.getInfo(req.user.id);

    console.log("accountInfo", accountInfo);
    return {
      ...req.user,
      applicant: accountInfo.applicant,
      enterprise: accountInfo.enterprise,
    };
  }
}
