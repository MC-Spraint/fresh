import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import configure from "./shared/config/configuration";
import { getLogger } from "./shared/config/logger.config";
import { Logger } from "@nestjs/common";
import { createDocument } from "./shared/config/swagger/swagger";
import { SwaggerModule } from "@nestjs/swagger";
import { EnvVariables } from "./shared/config/env-variables.enum";

async function ApplicationBootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    logger: getLogger(),
  });
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>(EnvVariables.NODE_ENV);
  const logger = app.get(Logger);
  const port = configService.get(EnvVariables.PORT);
  configure(app, logger);
  SwaggerModule.setup("api", app, createDocument(app));
  await app.listen(port);
  logger.log(
    `${nodeEnv} server is up & running on port ${port}`,
    ApplicationBootstrap.name,
  );
}
ApplicationBootstrap();
