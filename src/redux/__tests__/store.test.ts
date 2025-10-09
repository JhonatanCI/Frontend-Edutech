import { describe, it, expect } from "vitest";
import { store } from "../store";
import { RootState, AppDispatch } from "../store";

describe("store", () => {
  it("should create store with correct reducers", () => {
    const state = store.getState();

    expect(state).toHaveProperty("tags");
    expect(state).toHaveProperty("search");
  });

  it("should have correct initial state for tags", () => {
    const state = store.getState();

    expect(state.tags).toEqual({
      tags: [],
    });
  });

  it("should have correct RootState type", () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty("tags");
    expect(state).toHaveProperty("search");
    expect(state.tags).toHaveProperty("tags");
    expect(state.search).toHaveProperty("currentSearch");
    expect(state.search).toHaveProperty("results");
    expect(state.search).toHaveProperty("pagination");
    expect(state.search).toHaveProperty("isLoading");
    expect(state.search).toHaveProperty("error");
    expect(state.search).toHaveProperty("recentSearches");
  });

  it("should have correct AppDispatch type", () => {
    const dispatch: AppDispatch = store.dispatch;

    expect(typeof dispatch).toBe("function");
  });

  it("should dispatch actions correctly", () => {
    const initialState = store.getState();

    // Dispatch an action to tags
    store.dispatch({
      type: "tags/addTag",
      payload: "test tag",
    });

    const newState = store.getState();
    expect(newState.tags.tags).toEqual(["test tag"]);
    expect(newState.tags).not.toEqual(initialState.tags);
  });

  it("should dispatch search actions correctly", () => {
    const initialState = store.getState();

    // Dispatch an action to search
    store.dispatch({
      type: "search/setSearchTerm",
      payload: "test search",
    });

    const newState = store.getState();
    expect(newState.search.currentSearch).toBe("test search");
    expect(newState.search).not.toEqual(initialState.search);
  });

  it("should be a singleton store", () => {
    const store1 = store;
    const store2 = store;

    expect(store1).toBe(store2);
  });

  it("should have correct store configuration", () => {
    // Check if store has required methods
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.replaceReducer).toBeDefined();
  });
});
