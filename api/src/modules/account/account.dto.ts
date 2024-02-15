import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { Experience } from "../applicant/applicant.entity";

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}

class UpdateEnterpriseDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  description?: string;
}

class UpdateApplicantDto {
  @ApiProperty()
  @IsString()
  firsname!: string;

  @ApiProperty()
  @IsString()
  lastname!: string;

  @ApiProperty()
  @IsString()
  whoami!: string;

  @ApiProperty({ type: Experience, isArray: true })
  @IsArray()
  experiences!: Experience[];
}

export class UpdateAccountDto {
  @IsObject()
  @ApiProperty()
  enterprise!: UpdateEnterpriseDto;

  @IsObject()
  @ApiProperty()
  applicant!: UpdateApplicantDto;
}
