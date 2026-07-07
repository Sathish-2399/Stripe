import { EnvsConfigSource } from "@tsed/config/envs";
import { readFileSync } from "node:fs";
import loggerConfig from "./logger/index.js";

const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));
/**
 * This is the shared configuration for the application
 */
export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  ajv: {
    returnsCoercedValues: true
  },
  logger: loggerConfig,
  extends: [
    EnvsConfigSource]
};
