import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TagsState {
    tags: string[];
}

const initialState: TagsState = {
    tags: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        initializeTags: (state) => {
            state.tags = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        },
        addTag: (state, action: PayloadAction<string>) => {
            state.tags.push(action.payload);
            localStorage.setItem('recentSearches', JSON.stringify(state.tags));
        },
    },
});

export const { initializeTags, addTag } = tagsSlice.actions;
export default tagsSlice.reducer;
