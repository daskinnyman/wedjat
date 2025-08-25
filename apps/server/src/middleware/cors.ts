import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: ["*"], // Configure this based on your needs
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
});
