import { z } from "zod";

export type QueryResponse = {
  answer: string;
  sources: string[];
};

export const querySchema = z.object({
  question: z.string().min(1),
  selectionText: z.string().min(1),
  pageUrl: z.string().url(),
});

export type QueryRequest = z.infer<typeof querySchema>;
