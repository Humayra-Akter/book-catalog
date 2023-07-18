import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  _id: string;
  status: boolean;
  publication_date: string;
  searchQuery: string;
  recentlyAddedBooks: string[];
  addingBook: boolean;
  error: string | null;
  title: string;
  author: string;
  genre: string;
  price: number;
  rating: number;
  features: string;
  quantity: number;
}

const initialState: IBook = {
  _id: '',
  status: false,
  publication_date: '2023',
  searchQuery: '',
  recentlyAddedBooks: [],
  addingBook: false,
  error: null,
  title: '',
  author: '',
  genre: '',
  price: 0,
  rating: 0,
  features: '',
  quantity: 0,
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
    addBookRequest: (state, action: PayloadAction<IBook>) => {
      const {
        title,
        author,
        genre,
        publication_date,
        price,
        rating,
        status,
        features,
        quantity,
      } = action.payload;
      const newBook = {
        title,
        author,
        genre,
        publication_date,
        price,
        rating,
        status,
        features,
        quantity,
      };
      state.recentlyAddedBooks.push(newBook.title);
    },
    editBookRequest: (state, action: PayloadAction<IBook>) => {
      const {
        _id,
        title,
        author,
        genre,
        publication_date,
        price,
        rating,
        status,
        features,
        quantity,
      } = action.payload;
      const index = state.recentlyAddedBooks.findIndex((id) => id === _id);
      if (index !== -1) {
        const updatedBook = {
          _id,
          title,
          author,
          genre,
          publication_date,
          price,
          rating,
          status,
          features,
          quantity,
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
