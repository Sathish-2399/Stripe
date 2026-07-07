import { Command, CommandProvider } from "@tsed/cli-core";
import type { PromptOptions } from "@tsed/cli-prompts";

export interface HelloCommandContext {
}

@Command({
  name: "hello-command",
  description: "Command description",
  args: {
  },
  options: {
  },
  allowUnknownOption: false
})
export class HelloCommand implements CommandProvider {
  /**
   *  Ask questions with the Ts.ED prompt runner (powered by @clack/prompts).
   *  Return an empty array or don't implement the method to skip this step.
   */
  async $prompt(initialOptions: Partial<HelloCommandContext>): Promise<PromptOptions[]> {
    return [];
  }

  /**
   * This method is called after the $prompt to create / map inputs to a proper context for the next step
   */
  $mapContext(ctx: Partial<HelloCommandContext>): HelloCommandContext {
    return {
      ...ctx
      // map something, based on ctx
    };
  }
  /**
   *  This step runs your tasks via the @clack/prompts-based @tsed/cli-tasks helpers.
   */
  async $exec(ctx: HelloCommandContext): Promise<any> {
    return [
      {
        title: "Do something",
        task: () => {
          console.log('HELLO')
        }
      }
    ];
  }
}
