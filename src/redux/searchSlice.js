// Redux slice for search query state
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // stores what user types in search box
  },
  reducers: {

    // Update search query when user types
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

// Export action
export const { setSearchQuery } = searchSlice.actions;

// Selector - used to read search query from Redux store
export const selectSearchQuery = (state) => state.search.query;

export default searchSlice.reducer;