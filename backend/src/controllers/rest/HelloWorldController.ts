import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/hello")
export class HelloWorldController {
  @Get("/")
  get() {
    return "hello";
  }
}
