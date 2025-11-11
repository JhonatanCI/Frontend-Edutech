import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getGeneralResults, getResults, getTopSearchKeywords } from "../search";
import { API } from "../../config/axios";

// Mock the API
vi.mock("../../config/axios", () => ({
  API: {
    get: vi.fn(),
  },
}));

describe("search service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getGeneralResults", () => {
    it("should fetch general results successfully", async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: "1",
              name: "General Course",
              description: "General description",
            },
          ],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getGeneralResults();

      expect(API.get).toHaveBeenCalledWith("/search/general");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle API errors", async () => {
      const mockError = new Error("Network error");
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getGeneralResults()).rejects.toThrow("Network error");
      expect(API.get).toHaveBeenCalledWith("/search/general");
    });

    it("should handle non-Error exceptions", async () => {
      vi.mocked(API.get).mockRejectedValueOnce("String error");

      await expect(getGeneralResults()).rejects.toBe("String error");
    });

    it("should handle 404 errors", async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: "Not found" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getGeneralResults()).rejects.toEqual(mockError);
    });

    it("should handle 500 errors", async () => {
      const mockError = {
        response: {
          status: 500,
          data: { message: "Internal server error" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getGeneralResults()).rejects.toEqual(mockError);
    });

    it("should handle timeout errors", async () => {
      const mockError = {
        code: "ECONNABORTED",
        message: "timeout of 5000ms exceeded",
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getGeneralResults()).rejects.toEqual(mockError);
    });

    it("should handle empty response", async () => {
      const mockResponse = {
        data: null,
      };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getGeneralResults();

      expect(result).toBeNull();
    });

    it("should handle undefined response", async () => {
      const mockResponse = {
        data: undefined,
      };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getGeneralResults();

      expect(result).toBeUndefined();
    });
  });

  describe("getResults", () => {
    it("should fetch results with query successfully", async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: "1",
              name: "Search Result",
              description: "Search description",
            },
          ],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("test query");

      expect(API.get).toHaveBeenCalledWith("/search/tags?query=test query");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle empty query", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("");

      expect(API.get).toHaveBeenCalledWith("/search/tags?query=");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle query with special characters", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("test@#$%query");

      expect(API.get).toHaveBeenCalledWith("/search/tags?query=test@#$%query");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle query with spaces", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("test query with spaces");

      expect(API.get).toHaveBeenCalledWith(
        "/search/tags?query=test query with spaces",
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle query with unicode characters", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("búsqueda con acentos");

      expect(API.get).toHaveBeenCalledWith(
        "/search/tags?query=búsqueda con acentos",
      );
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle API errors", async () => {
      const mockError = new Error("Network error");
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getResults("test query")).rejects.toThrow("Network error");
      expect(API.get).toHaveBeenCalledWith("/search/tags?query=test query");
    });

    it("should handle non-Error exceptions", async () => {
      vi.mocked(API.get).mockRejectedValueOnce("String error");

      await expect(getResults("test query")).rejects.toBe("String error");
    });

    it("should handle 404 errors", async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: "Not found" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getResults("test query")).rejects.toEqual(mockError);
    });

    it("should handle 500 errors", async () => {
      const mockError = {
        response: {
          status: 500,
          data: { message: "Internal server error" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getResults("test query")).rejects.toEqual(mockError);
    });

    it("should handle timeout errors", async () => {
      const mockError = {
        code: "ECONNABORTED",
        message: "timeout of 5000ms exceeded",
      };
      vi.mocked(API.get).mockRejectedValueOnce(mockError);

      await expect(getResults("test query")).rejects.toEqual(mockError);
    });

    it("should handle empty response", async () => {
      const mockResponse = {
        data: null,
      };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("test query");

      expect(result).toBeNull();
    });

    it("should handle undefined response", async () => {
      const mockResponse = {
        data: undefined,
      };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults("test query");

      expect(result).toBeUndefined();
    });

    it("should handle very long queries", async () => {
      const longQuery = "a".repeat(1000);
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getResults(longQuery);

      expect(API.get).toHaveBeenCalledWith(`/search/tags?query=${longQuery}`);
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle null query", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await getResults(null as any);

      expect(API.get).toHaveBeenCalledWith("/search/tags?query=null");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle undefined query", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await getResults(undefined as any);

      expect(API.get).toHaveBeenCalledWith("/search/tags?query=undefined");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("service integration", () => {
    it("should handle multiple concurrent requests", async () => {
      const mockResponse1 = { data: { results: ["result1"] } };
      const mockResponse2 = { data: { results: ["result2"] } };

      vi.mocked(API.get)
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const [result1, result2] = await Promise.all([
        getGeneralResults(),
        getResults("test query"),
      ]);

      expect(result1).toEqual(mockResponse1.data);
      expect(result2).toEqual(mockResponse2.data);
      expect(API.get).toHaveBeenCalledTimes(2);
    });

    it("should handle mixed success and error responses", async () => {
      const mockResponse = { data: { results: ["result"] } };
      const mockError = new Error("Network error");

      vi.mocked(API.get)
        .mockResolvedValueOnce(mockResponse)
        .mockRejectedValueOnce(mockError);

      const result1 = await getGeneralResults();
      await expect(getResults("test query")).rejects.toThrow("Network error");

      expect(result1).toEqual(mockResponse.data);
      expect(API.get).toHaveBeenCalledTimes(2);
    });
  });

  describe("getTopSearchKeywords", () => {
    it("should fetch top search keywords with default limit", async () => {
      const mockData = ["React", "TypeScript", "JavaScript", "Node.js", "Python"];
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords();

      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: 5 },
      });
      expect(result).toEqual(mockData);
    });

    it("should fetch top search keywords with custom limit", async () => {
      const mockData = ["React", "TypeScript", "JavaScript"];
      const mockResponse = { data: mockData };
      const customLimit = 3;
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords(customLimit);

      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: customLimit },
      });
      expect(result).toEqual(mockData);
    });

    it("should handle limit of 10", async () => {
      const mockData = Array(10).fill("keyword");
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords(10);

      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: 10 },
      });
      expect(result).toEqual(mockData);
    });

    it("should return objects with keyword field", async () => {
      const mockData = [
        { keyword: "React", count: 100 },
        { keyword: "TypeScript", count: 85 },
      ];
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords(2);

      expect(result).toEqual(mockData);
    });

    it("should return empty array when no keywords available", async () => {
      const mockData: string[] = [];
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords();

      expect(result).toEqual([]);
    });

    it("should throw error when API call fails", async () => {
      const error = new Error("Failed to fetch keywords");
      vi.mocked(API.get).mockRejectedValueOnce(error);

      await expect(getTopSearchKeywords()).rejects.toThrow(
        "Failed to fetch keywords",
      );
      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: 5 },
      });
    });

    it("should throw error on network timeout", async () => {
      const error = new Error("Request timeout");
      vi.mocked(API.get).mockRejectedValueOnce(error);

      await expect(getTopSearchKeywords(5)).rejects.toThrow("Request timeout");
    });

    it("should handle 404 error", async () => {
      const error = {
        response: {
          status: 404,
          data: { message: "Not found" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(error);

      await expect(getTopSearchKeywords()).rejects.toEqual(error);
    });

    it("should handle 500 server error", async () => {
      const error = {
        response: {
          status: 500,
          data: { message: "Internal server error" },
        },
      };
      vi.mocked(API.get).mockRejectedValueOnce(error);

      await expect(getTopSearchKeywords()).rejects.toEqual(error);
    });

    it("should handle limit of 1", async () => {
      const mockData = ["React"];
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords(1);

      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: 1 },
      });
      expect(result).toEqual(mockData);
    });

    it("should handle very large limit", async () => {
      const mockData = Array(100).fill("keyword");
      const mockResponse = { data: mockData };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords(100);

      expect(API.get).toHaveBeenCalledWith("/SearchKeywords/top", {
        params: { limit: 100 },
      });
      expect(result).toEqual(mockData);
    });

    it("should return null when response data is null", async () => {
      const mockResponse = { data: null };
      vi.mocked(API.get).mockResolvedValueOnce(mockResponse);

      const result = await getTopSearchKeywords();

      expect(result).toBeNull();
    });

    it("should handle non-Error exceptions", async () => {
      vi.mocked(API.get).mockRejectedValueOnce("String error");

      await expect(getTopSearchKeywords()).rejects.toBe("String error");
    });
  });
});
