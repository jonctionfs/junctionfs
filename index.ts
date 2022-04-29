import { dotEnvConfig, listenAndServe } from "./deps.ts"
import * as routes from './routes.ts'

dotEnvConfig({export: true})

listenAndServe(":3000", async (req) => {
  if (req.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400"
      }
    })
  } else if (req.method == "POST") {
    return await routes.actionHandler(req)
  }

  return new Response("Route not found", { status: 404 })
});
