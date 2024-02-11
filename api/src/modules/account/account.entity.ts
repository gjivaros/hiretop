import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApplicantEntity } from "../applicant/applicant.entity";
import { EnterpriseEntity } from "../enterprise/enterprise.entity";

@Entity("Account")
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToOne(() => ApplicantEntity, (applicant) => applicant.account)
  applicant?: ApplicantEntity;

  @OneToOne(() => EnterpriseEntity, (enterprise) => enterprise.account)
  enterprise?: EnterpriseEntity;
}
