// HTTP Client Configuration
const API_BASE_URL = "http://localhost:3000";
const API_VERSION = "v1";

// Generic API Response Type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// HTTP Client Class
export class HttpClient {
  private baseUrl: string;
  private version: string;

  constructor(baseUrl: string = API_BASE_URL, version: string = API_VERSION) {
    this.baseUrl = baseUrl;
    this.version = version;
  }

  // Build API endpoint URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/api/${this.version}/${endpoint}`;
  }

  // Generic HTTP request method
  async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`HTTP Client Error in ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers,
    });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      headers,
    });
  }
}

// Default HTTP client instance
export const httpClient = new HttpClient();

// Utility functions for common operations
export const api = {
  get: <T>(endpoint: string) => httpClient.get<T>(endpoint),
  post: <T>(endpoint: string, data: any) => httpClient.post<T>(endpoint, data),
  put: <T>(endpoint: string, data: any) => httpClient.put<T>(endpoint, data),
  delete: <T>(endpoint: string) => httpClient.delete<T>(endpoint),
};
