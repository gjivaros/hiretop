import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { appConf, appLog } from './context';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ credentials: true, origin: '*' });
  app.useGlobalPipes(new ValidationPipe());

  if (appConf.thisServer.hostName) {
    await app.listen(appConf.thisServer.port, appConf.thisServer.hostName);
  } else {
    await app.listen(appConf.thisServer.port);
  }

  appLog.info(
    `Server hiretop up and running on port '${appConf.thisServer.port}'`,
  );
}
bootstrap().catch(console.error);
