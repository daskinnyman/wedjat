import { httpClient } from "../httpClient";
import { QueryRequest, QueryResponse } from "shared/types/query";

export class QueryService {
  static async sendQuery(request: QueryRequest): Promise<QueryResponse> {
    const response = await httpClient.post<QueryResponse>("query", request);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to send query");
    }
    
    return response.data;
  }

  static async healthCheck(): Promise<{ status: string }> {
    const response = await httpClient.get<{ status: string }>("health");
    
    if (!response.success || !response.data) {
      throw new Error(response.error || "Health check failed");
    }
    
    return response.data;
  }
}
