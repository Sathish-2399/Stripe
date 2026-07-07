#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import * as commands from "./bin/commands/index.js";
import { HelloCommand } from "./commands\\HelloCommand.js";
import { config } from "./config/config.js";

CliCore.bootstrap({
  ...config,
  commands: [...Object.values(commands), HelloCommand]
}).catch(console.error);
