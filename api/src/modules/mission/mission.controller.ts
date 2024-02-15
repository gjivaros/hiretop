import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { appLog } from "src/context";
import { AccountEntity } from "../account/account.entity";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import {
  CreateMissionDto,
  MissionStatus,
  UpdateMissionDto,
} from "./mission.inputs";
import { MissionService } from "./mission.service";

@ApiBearerAuth()
@ApiTags("Missions")
@UseGuards(JwtAuthGuard)
@Controller("missions")
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  create(
    @Body() createMissionDto: CreateMissionDto,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.info("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.missionService.create({
      ...createMissionDto,
      enterpriseId: req.user.id,
    });
  }

  @Get()
  @ApiQuery({
    name: "status",
    required: false,
    type: "string",
  })
  findAll(
    @Request() req: Request & { user?: AccountEntity },
    @Query("status") status?: MissionStatus
  ) {
    appLog.debug("logged user", req.user);

    if (!req.user) throw new UnauthorizedException();

    return this.missionService.findAll({ enterpriseId: req.user.id, status });
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.missionService.findOne({ enterpriseId: req.user.id, id });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMissionDto: UpdateMissionDto,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.missionService.update(
      { enterpriseId: req.user.id, id },
      updateMissionDto
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @Request() req: Request & { user?: AccountEntity }
  ) {
    appLog.debug("logged user", req.user);
    if (!req.user) throw new UnauthorizedException();

    return this.missionService.remove({ enterpriseId: req.user.id, id });
  }
}
