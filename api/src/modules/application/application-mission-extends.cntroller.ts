import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { appLog } from "src/context";
import { AccountEntity } from "../account/account.entity";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { PostulateMissionDto } from "./application.inputs";
import { ApplicationService } from "./application.service";

@ApiBearerAuth()
@ApiTags("Missions")
@UseGuards(JwtAuthGuard)
@Controller("missions")
export class MissionExtendsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post("postulate")
  postulate(
    @Body() postulateMissionDto: PostulateMissionDto,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.info("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.applicationService.create({
      applicantId: req.user.id,
      missionId: postulateMissionDto.missionId,
    });
  }
}
