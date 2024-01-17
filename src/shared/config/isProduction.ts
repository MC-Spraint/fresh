import { Environment } from "./environment.enum";

export function isProduction(): boolean {
  const nodeEnv = process.env.NODE_ENV;
  const isProd = String(nodeEnv) === Environment.PRODUCTION;
  return isProd;
}
