import { LoggerService } from "@nestjs/common";
import { WinstonModule, utilities } from "nest-winston";
import * as winston from "winston";
import * as path from "path";
import { isProduction } from "./isProduction";

function getTransports(): winston.transports.ConsoleTransportInstance[] {
  const appName = "FRESH";
  const isProd = isProduction();
  const transports = [];
  const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      utilities.format.nestLike(appName, {
        prettyPrint: true,
      }),
    ),
  });
  transports.push(consoleTransport);
  if (isProd) {
    const fileTransport = new winston.transports.File({
      filename: path.join(__dirname, "../logs/logs.log"),
      maxFiles: 5,
      maxsize: 1000 * 1024,
    });
    const errorFileTransport = new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      maxFiles: 5,
      maxsize: 1000 * 1024,
      level: "error",
    });
    transports.push(fileTransport);
    transports.push(errorFileTransport);
  }
  return transports;
}
export const getLogger: () => LoggerService = () => {
  const transports = getTransports();
  return WinstonModule.createLogger({
    transports,
  });
};
