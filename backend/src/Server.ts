import "@tsed/ajv";
import "@tsed/platform-log-request";

import { Configuration } from "@tsed/di";
import { application } from "@tsed/platform-http";
import { join } from "node:path";

import "@tsed/platform-express";
import "@tsed/swagger";
import { config } from "./config/config.js";
import * as pages from "./controllers/pages/index.js";
import * as rest from "./controllers/rest/index.js";

import * as refund from "./controllers/RefundController.js";
import * as dispute from "./controllers/DisputeController.js";
import * as payment_links from "./controllers/PaymentLinkController.js";
import * as payment from "./controllers/PaymentController.js";
import * as user from "./controllers/UserController.js";
import * as merchant from "./controllers/MerchantConroller.js";
import * as application_fee from "./controllers/ApplicationFeeController.js";
import * as application_fee_redund from "./controllers/ApplicationFeeRefundController.js";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/": [
      ...Object.values(refund),
      ...Object.values(dispute),
      ...Object.values(payment_links),
      ...Object.values(payment),
      ...Object.values(user),
      ...Object.values(merchant),
      ...Object.values(application_fee),
      ...Object.values(application_fee_redund)
    ],
    "/rest": [...Object.values(rest)],
    "/ss": [...Object.values(pages)]
  },
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  swagger: [
    {
      "path": "/doc",
      "specVersion": "3.1.0"
    }
  ],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    {
      "use": "urlencoded-parser",
      "options": {
        "extended": true
      }
    }
  ]
})
export class Server {
  protected app = application();
}
