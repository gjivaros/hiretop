import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { appConf, packageDir } from "./context";
import { AccountModule } from "./modules/account/account.module";
import { ApplicantModule } from "./modules/applicant/applicant.module";
import { ApplicationModule } from "./modules/application/application.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MissionModule } from "./modules/mission/mission.module";
import { TypeORMLogger } from "./typeorm-logger";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: appConf.sqliteFiles.primary,
      enableWAL: false,
      entities: [`${packageDir}/dist/**/*.entity.js`],
      synchronize: true,
      logging: true,
      logger: new TypeORMLogger(),
    }),
    AccountModule,
    AuthModule,
    MissionModule,
    ApplicantModule,
    ApplicationModule,
  ],
  providers: [AppService],
})
export class AppModule {}
