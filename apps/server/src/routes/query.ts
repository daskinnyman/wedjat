import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { QueryResponse } from "shared";
import { querySchema } from "shared";

const app = new Hono();

app.post("/query", zValidator("json", querySchema), async (c) => {
  const { question, selectionText, pageUrl } = c.req.valid("json");

  // Business logic directly in the route handler
  console.log("Query received:", { question, selectionText, pageUrl });

  const response: QueryResponse = {
    answer: "Day1 stub",
    sources: [],
  };

  return c.json(response);
});

export default app;
