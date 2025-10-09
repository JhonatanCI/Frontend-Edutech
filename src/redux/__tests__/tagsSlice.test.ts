import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import tagsReducer, { initializeTags, addTag } from "../tagsSlice";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("tagsSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue("[]");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial state", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });

    expect(initialState).toEqual({
      tags: [],
    });
  });

  it("should handle initializeTags", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(["tag1", "tag2"]));

    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = initializeTags();
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["tag1", "tag2"]);
  });

  it("should handle initializeTags with empty localStorage", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = initializeTags();
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual([]);
  });

  it("should handle addTag", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag("new tag");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["new tag"]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "recentSearches",
      JSON.stringify(["new tag"]),
    );
  });

  it("should handle addTag with existing tags", () => {
    const initialState = {
      ...tagsReducer(undefined, { type: "unknown" }),
      tags: ["existing tag"],
    };
    const action = addTag("new tag");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["existing tag", "new tag"]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "recentSearches",
      JSON.stringify(["existing tag", "new tag"]),
    );
  });

  it("should handle addTag with empty string", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag("");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual([""]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "recentSearches",
      JSON.stringify([""]),
    );
  });

  it("should handle addTag with whitespace", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag("   ");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["   "]);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "recentSearches",
      JSON.stringify(["   "]),
    );
  });

  it("should maintain immutability", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag("new tag");
    const newState = tagsReducer(initialState, action);

    expect(initialState).not.toBe(newState);
    expect(initialState.tags).toEqual([]);
    expect(newState.tags).toEqual(["new tag"]);
  });

  it("should handle multiple actions in sequence", () => {
    let state = tagsReducer(undefined, { type: "unknown" });

    state = tagsReducer(state, addTag("tag1"));
    expect(state.tags).toEqual(["tag1"]);

    state = tagsReducer(state, addTag("tag2"));
    expect(state.tags).toEqual(["tag1", "tag2"]);

    state = tagsReducer(state, addTag("tag3"));
    expect(state.tags).toEqual(["tag1", "tag2", "tag3"]);
  });

  it("should handle initializeTags after addTag", () => {
    let state = tagsReducer(undefined, { type: "unknown" });

    state = tagsReducer(state, addTag("tag1"));
    state = tagsReducer(state, addTag("tag2"));

    expect(state.tags).toEqual(["tag1", "tag2"]);

    // Simulate reinitializing from localStorage
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(["stored1", "stored2"]),
    );
    state = tagsReducer(state, initializeTags());

    expect(state.tags).toEqual(["stored1", "stored2"]);
  });

  it("should handle special characters in tags", () => {
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag("tag@#$%");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["tag@#$%"]);
  });

  it("should handle very long tags", () => {
    const longTag = "a".repeat(1000);
    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = addTag(longTag);
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual([longTag]);
  });

  it("should handle duplicate tags", () => {
    const initialState = {
      ...tagsReducer(undefined, { type: "unknown" }),
      tags: ["existing tag"],
    };
    const action = addTag("existing tag");
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual(["existing tag", "existing tag"]);
  });

  it("should handle null localStorage value", () => {
    localStorageMock.getItem.mockReturnValue(null);

    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = initializeTags();
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual([]);
  });

  it("should handle undefined localStorage value", () => {
    localStorageMock.getItem.mockReturnValue(undefined);

    const initialState = tagsReducer(undefined, { type: "unknown" });
    const action = initializeTags();
    const newState = tagsReducer(initialState, action);

    expect(newState.tags).toEqual([]);
  });
});
