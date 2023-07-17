import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  status: boolean;
  publication_date: string;
  searchQuery: string;
  recentlyAddedBooks: object[];
}

const initialState: IBook = {
  status: false,
  publication_date: '2023',
  searchQuery: '',
  recentlyAddedBooks: [],
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setYearOfPublish: (state, action: PayloadAction<string>) => {
      state.publication_date = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setRecentlyAddedBooks: (state, action) => {
      state.recentlyAddedBooks = action.payload;
    },
  },
});

export const {
  toggleState,
  setYearOfPublish,
  setSearchQuery,
  setRecentlyAddedBooks,
} = bookSlice.actions;
export default bookSlice.reducer;
