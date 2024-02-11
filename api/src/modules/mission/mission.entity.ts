import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnterpriseEntity } from "../enterprise/enterprise.entity";
import { MissionStatus, SalaryEntity } from "./mission.inputs";

@Entity("Mission")
export class MissionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column({ default: "open" })
  status!: MissionStatus;

  @Column({ type: "text" })
  salary!: SalaryEntity;

  @Column()
  enterpriseId!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.missions, {
    eager: true,
  })
  @JoinColumn({ name: "enterpriseId" })
  enterprise!: EnterpriseEntity;

  @AfterLoad()
  parseSalary() {
    this.salary = JSON.parse(this.salary as any);
  }
}
