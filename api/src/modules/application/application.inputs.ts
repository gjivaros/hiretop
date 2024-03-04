import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export type ApplicationStatus = "accepted" | "refused" | "pending" | "canceled";

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  missionId!: string;

  @ApiProperty()
  @IsString()
  applicantId!: string;
}

export class PostulateMissionDto {
  @ApiProperty()
  @IsString()
  missionId!: string;
}

export class UpdateApplicationDto {
  @ApiProperty()
  @IsString()
  status!: ApplicationStatus;
}
