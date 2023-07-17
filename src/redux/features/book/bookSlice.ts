import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

interface IBook {
  _id: string;
  status: boolean;
  publication_date: string;
  searchQuery: string;
  recentlyAddedBooks: string[];
  addingBook: boolean;
  error: string | null;
}

const initialState: IBook = {
  _id: '',
  status: false,
  publication_date: '2023',
  searchQuery: '',
  recentlyAddedBooks: [],
  addingBook: false,
  error: null,
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setRecentlyAddedBooks: (state, action: PayloadAction<string[]>) => {
      state.recentlyAddedBooks = action.payload;
    },
    addBook: (state, action: PayloadAction<IBook>) => {
      state.recentlyAddedBooks.push(action.payload._id);
    },
    editBook: (state, action: PayloadAction<IBook>) => {
      const { _id } = action.payload;
      const index = state.recentlyAddedBooks.findIndex((id) => id === _id);
      if (index !== -1) {
        state.recentlyAddedBooks[index] = _id;
      }
    },
    addBookRequest: (
      state,
      action: PayloadAction<{ title: string; author: string }>
    ) => {
      const { title, author } = action.payload;
      const newBook = {
        _id: generateUniqueId(),
        title,
        author,
      };
      state.recentlyAddedBooks.push(newBook._id);
    },
    editBookRequest: (
      state,
      action: PayloadAction<{ _id: string; title: string; author: string }>
    ) => {
      const { _id, title, author } = action.payload;
      const index = state.recentlyAddedBooks.findIndex((id) => id === _id);
      if (index !== -1) {
        const updatedBook = {
          _id,
          title,
          author,
        };
        state.recentlyAddedBooks[index] = updatedBook._id;
      }
    },
  },
});

export const {
  toggleState,
  setYearOfPublish,
  setSearchQuery,
  setRecentlyAddedBooks,
  addBook,
  editBook,
  addBookRequest,
  editBookRequest,
} = bookSlice.actions;
export default bookSlice.reducer;
