import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { corsMiddleware } from "./middleware/cors.js";
import healthRoutes from "./routes/health.js";
import queryRoutes from "./routes/query.js";

const app = new Hono();

// Apply CORS middleware to all API routes
app.use("/api/*", corsMiddleware);

// Root endpoint
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// API routes
const api = app.basePath("/api/v1");
api.route("/", healthRoutes);
api.route("/", queryRoutes);

// Start server
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
