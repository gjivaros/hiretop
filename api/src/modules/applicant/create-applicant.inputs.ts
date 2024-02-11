import { Experience } from "./applicant.entity";

export class CreateApplicantDto {
  id!: string;
  firstname?: string;
  lastname?: string;
  experiences?: Experience[];
}
