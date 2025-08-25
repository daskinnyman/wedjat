export interface QueryResponse {
  answer: string;
  sources: string[];
}

export interface QueryRequest {
  question: string;
  selectionText: string;
  pageUrl: string;
}

