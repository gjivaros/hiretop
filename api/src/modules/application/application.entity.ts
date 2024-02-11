import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
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
}
