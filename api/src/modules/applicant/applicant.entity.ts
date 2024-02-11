import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { AccountEntity } from "../account/account.entity";

@Entity("Applicant")
export class ApplicantEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  firsname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ type: "json", nullable: true })
  experiences?: Experience[];

  @OneToMany(() => AccountEntity, (account) => account.applicant)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  account?: AccountEntity;
}

export interface Experience {
  start: number;
  end: number;
  post: string;
  enterprise: string;
}
