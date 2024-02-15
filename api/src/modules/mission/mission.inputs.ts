import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export type MissionStatus = "pending" | "open" | "close" | "canceled";

export class SalaryEntity {
  @ApiProperty()
  @IsString()
  type!: "month" | "year";

  @ApiProperty()
  @IsNumber()
  min!: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  @IsOptional()
  max?: number;

  @ApiProperty()
  @IsString()
  currency!: string;
}

export class CreateMissionDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  localisation!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsObject()
  salary!: SalaryEntity;
}

export class UpdateMissionDto {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}
