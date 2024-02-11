import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { appLog } from "src/context";
import { AccountEntity } from "../account/account.entity";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { ApplicationStatus, UpdateApplicationDto } from "./application.inputs";
import { ApplicationService } from "./application.service";

@ApiTags("Applications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("applications")
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  findAll(
    @Request() req: Request & { user?: AccountEntity },
    @Query("status") status: ApplicationStatus
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.applicationService.findAll({
      applicantId: req.user.id,
      status,
    });
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.applicationService.findOne({ id, applicantId: req.user.id });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();
    return this.applicationService.update(
      { id, applicantId: req.user.id },
      updateApplicationDto
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();
    return this.applicationService.remove({ applicantId: req.user.id, id });
  }
}
