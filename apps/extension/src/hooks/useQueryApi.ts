import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryRequest } from "shared/types/query";
import { QueryService } from "../api/services/queryService";

// Query key constants
export const queryKeys = {
  query: ["query"] as const,
  health: ["health"] as const,
} as const;

// Hook for using queries
export const useQueryData = (request: QueryRequest) => {
  return useQuery({
    queryKey: [...queryKeys.query, request],
    queryFn: () => QueryService.sendQuery(request),
    enabled: false, // Default not auto-execute
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for using mutations
export const useSendQuery = () => {
  return useMutation({
    mutationFn: (request: QueryRequest) => QueryService.sendQuery(request),
    onError: (error) => {
      console.error("Query mutation error:", error);
    },
  });
};

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => QueryService.healthCheck(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });
};
