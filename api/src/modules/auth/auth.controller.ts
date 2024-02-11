import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../account/account.dto";
import { AuthService } from "../auth/auth.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post("register")
  @ApiBody({ type: LoginDto })
  async register(@Body() payload: LoginDto) {
    return await this.authservice.register(payload);
  }

  @Post("login")
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  async login(@Body() loginInput: LoginDto) {
    return await this.authservice.login(loginInput);
  }
}
