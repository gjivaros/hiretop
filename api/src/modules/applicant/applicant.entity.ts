import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { AccountEntity } from "../account/account.entity";
import { ApplicationEntity } from "../application/application.entity";

@Entity("Applicant")
export class ApplicantEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ nullable: true })
  whoami?: string;

  @Column({ type: "json", nullable: true })
  experiences?: Experience[];

  @OneToMany(() => AccountEntity, (account) => account.applicant)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  account?: AccountEntity;

  @OneToMany(() => ApplicationEntity, (application) => application.mission, {
    eager: true,
  })
  applications!: ApplicationEntity[];

  get isCompleted() {
    for (const key in this) {
      if (!this[key]) return false;
    }
    return true;
  }
}

export class Experience {
  @ApiProperty()
  @IsString()
  period!: string;

  @IsString()
  @ApiProperty()
  post!: string;

  @IsString()
  @ApiProperty()
  enterprise!: string;
}
