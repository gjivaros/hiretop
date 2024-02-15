import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { AccountEntity } from "../account/account.entity";
import { MissionEntity } from "../mission/mission.entity";

@Entity("Enterprise")
export class EnterpriseEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => AccountEntity, (account) => account.applicant)
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  account?: AccountEntity;

  @OneToMany(() => MissionEntity, (mission) => mission.enterprise)
  missions?: MissionEntity[];

  get isCompleted() {
    for (const key in this) {
      if (!this[key]) return false;
    }
    return true;
  }
}
