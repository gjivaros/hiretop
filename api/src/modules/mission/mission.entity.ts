import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApplicationEntity } from "../application/application.entity";
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

  @Column({ nullable: true })
  localisation?: string;

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

  @OneToMany(() => ApplicationEntity, (application) => application.mission, {
    eager: true,
  })
  applications!: ApplicationEntity[];

  @AfterLoad()
  parseSalary() {
    this.salary = JSON.parse(this.salary as any);
  }
}
