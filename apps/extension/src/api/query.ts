import { httpClient, ApiResponse } from "./httpClient";
import { QueryRequest, QueryResponse } from "shared/types/query";

// Query API functions
export const sendQuery = async (
  data: QueryRequest
): Promise<ApiResponse<QueryResponse>> => {
  return httpClient.post<QueryResponse>("query", data);
};

// Health check API function
export const healthCheck = async (): Promise<
  ApiResponse<{ status: string }>
> => {
  return httpClient.get<{ status: string }>("health");
};
