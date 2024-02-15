import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { ApplicantEntity } from "../applicant/applicant.entity";
import { MissionEntity } from "../mission/mission.entity";
import { ApplicationStatus } from "./application.inputs";

@Entity("Application")
@Unique(["missionId", "applicantId"])
export class ApplicationEntity {
  @Column({ type: "varchar", generated: "uuid" })
  id!: string;

  @PrimaryColumn()
  missionId!: string;

  @PrimaryColumn()
  applicantId!: string;

  @Column({ default: "pending" })
  status!: ApplicationStatus;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @ManyToOne(() => MissionEntity, (mission) => mission.applications)
  @JoinColumn({ name: "missionId" })
  mission?: MissionEntity;

  @ManyToOne(() => ApplicantEntity, (applicant) => applicant.applications)
  @JoinColumn({ name: "applicantId" })
  applicant?: ApplicantEntity;
}
