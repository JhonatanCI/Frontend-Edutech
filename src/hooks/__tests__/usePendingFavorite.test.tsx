import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePendingFavorite } from "../usePendingFavorite";

describe("usePendingFavorite", () => {
  const PENDING_FAVORITE_KEY = "pendingFavorite";

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("savePendingFavorite", () => {
    it("should save pending favorite to localStorage", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("program-123", "PROGRAM", "Test Program");
      });

      const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
      expect(stored).not.toBeNull();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.itemId).toBe("program-123");
        expect(parsed.itemType).toBe("PROGRAM");
        expect(parsed.itemName).toBe("Test Program");
        expect(parsed.timestamp).toBeGreaterThan(0);
      }
    });

    it("should save course as pending favorite", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("course-456", "COURSE", "Test Course");
      });

      const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
      expect(stored).not.toBeNull();

      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.itemType).toBe("COURSE");
        expect(parsed.itemName).toBe("Test Course");
      }
    });

    it("should overwrite existing pending favorite", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("program-1", "PROGRAM", "Program 1");
      });

      act(() => {
        result.current.savePendingFavorite("program-2", "PROGRAM", "Program 2");
      });

      const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.itemId).toBe("program-2");
        expect(parsed.itemName).toBe("Program 2");
      }
    });
  });

  describe("getPendingFavorite", () => {
    it("should return null when no pending favorite exists", () => {
      const { result } = renderHook(() => usePendingFavorite());

      const pending = result.current.getPendingFavorite();
      expect(pending).toBeNull();
    });

    it("should return pending favorite when it exists", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("program-123", "PROGRAM", "Test Program");
      });

      const stored = localStorage.getItem(PENDING_FAVORITE_KEY);
      expect(stored).not.toBeNull();

      const pending = result.current.getPendingFavorite();
      expect(pending).not.toBeNull();
      expect(pending?.itemId).toBe("program-123");
      expect(pending?.itemType).toBe("PROGRAM");
      expect(pending?.itemName).toBe("Test Program");
    });

    it("should return null and clear old pending favorite (older than 24 hours)", () => {
      const { result } = renderHook(() => usePendingFavorite());

      const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000;
      const oldFavorite = {
        itemId: "old-program",
        itemType: "PROGRAM" as const,
        itemName: "Old Program",
        timestamp: oldTimestamp,
      };

      localStorage.setItem(PENDING_FAVORITE_KEY, JSON.stringify(oldFavorite));

      const pending = result.current.getPendingFavorite();
      expect(pending).toBeNull();
      // El favorito expirado debe ser eliminado
      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).toBeNull();
    });

    it("should handle corrupted data gracefully", () => {
      const { result } = renderHook(() => usePendingFavorite());

      localStorage.setItem(PENDING_FAVORITE_KEY, "invalid-json");

      const pending = result.current.getPendingFavorite();
      expect(pending).toBeNull();
      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).toBeNull();
    });
  });

  describe("clearPendingFavorite", () => {
    it("should clear pending favorite from localStorage", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("program-123", "PROGRAM", "Test Program");
      });

      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).not.toBeNull();

      act(() => {
        result.current.clearPendingFavorite();
      });

      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).toBeNull();
    });

    it("should not throw error when clearing non-existent favorite", () => {
      const { result } = renderHook(() => usePendingFavorite());

      expect(() => {
        act(() => {
          result.current.clearPendingFavorite();
        });
      }).not.toThrow();
    });
  });

  describe("hasPendingFavorite", () => {
    it("should return false when no pending favorite exists", () => {
      const { result } = renderHook(() => usePendingFavorite());

      const hasPending = result.current.hasPendingFavorite();
      expect(hasPending).toBe(false);
    });

    it("should return true when pending favorite exists", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("program-123", "PROGRAM", "Test Program");
      });

      const hasPending = result.current.hasPendingFavorite();
      expect(hasPending).toBe(true);
    });

    it("should return false for old pending favorite (older than 24 hours)", () => {
      const { result } = renderHook(() => usePendingFavorite());

      const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000;
      const oldFavorite = {
        itemId: "old-program",
        itemType: "PROGRAM" as const,
        itemName: "Old Program",
        timestamp: oldTimestamp,
      };

      localStorage.setItem(PENDING_FAVORITE_KEY, JSON.stringify(oldFavorite));

      const hasPending = result.current.hasPendingFavorite();
      expect(hasPending).toBe(false);
      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).toBeNull();
    });

    it("should return false and clear corrupted data", () => {
      const { result } = renderHook(() => usePendingFavorite());

      localStorage.setItem(PENDING_FAVORITE_KEY, "invalid-json");

      const hasPending = result.current.hasPendingFavorite();
      expect(hasPending).toBe(false);
      expect(localStorage.getItem(PENDING_FAVORITE_KEY)).toBeNull();
    });
  });

  describe("Integration tests", () => {
    it("should complete full lifecycle: save, get, clear", () => {
      const { result } = renderHook(() => usePendingFavorite());

      // Save
      act(() => {
        result.current.savePendingFavorite("program-789", "PROGRAM", "Integration Program");
      });

      // Check exists
      expect(result.current.hasPendingFavorite()).toBe(true);

      // Get
      const pending = result.current.getPendingFavorite();
      expect(pending?.itemId).toBe("program-789");

      // Clear
      act(() => {
        result.current.clearPendingFavorite();
      });

      // Verify cleared
      expect(result.current.hasPendingFavorite()).toBe(false);
      expect(result.current.getPendingFavorite()).toBeNull();
    });

    it("should handle multiple operations without errors", () => {
      const { result } = renderHook(() => usePendingFavorite());

      act(() => {
        result.current.savePendingFavorite("item-1", "PROGRAM", "Item 1");
        result.current.savePendingFavorite("item-2", "COURSE", "Item 2");
        result.current.savePendingFavorite("item-3", "PROGRAM", "Item 3");
      });

      const pending = result.current.getPendingFavorite();
      expect(pending?.itemId).toBe("item-3");

      act(() => {
        result.current.clearPendingFavorite();
        result.current.clearPendingFavorite();
        result.current.clearPendingFavorite();
      });

      expect(result.current.hasPendingFavorite()).toBe(false);
    });
  });
});
