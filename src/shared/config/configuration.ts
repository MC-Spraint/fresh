import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import * as morgan from "morgan";
import { Logger, RawBodyRequest } from "@nestjs/common";
import { resolve } from "path";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { VALIDATION_PIPE } from "./pipe.config";
import { isProduction } from "./isProduction";

// middlewares and configs
export default function configure(
  app: NestExpressApplication,
  logger: Logger,
): void {
  const isProd = isProduction();
  const morganFormat = isProd ? "combined" : "dev";
  app.set("trust proxy", 1);
  app.enableCors();
  app.use(
    morgan(morganFormat, {
      stream: { write: (str: unknown) => logger.log(str) },
    }),
  );
  app.useGlobalPipes(VALIDATION_PIPE);
  if (isProd) {
    app.use(helmet());
  }
  app.use(
    bodyParser.json({
      verify: (req: RawBodyRequest<Request>, res: Response, buf: Buffer) => {
        req.rawBody = buf;
      },
    }),
  );
  app.useStaticAssets(resolve("./public"));
  app.setBaseViewsDir(resolve("./public/views"));
  app.useStaticAssets(resolve("./uploads"));

  app.setViewEngine("hbs");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.setGlobalPrefix("api");
}
