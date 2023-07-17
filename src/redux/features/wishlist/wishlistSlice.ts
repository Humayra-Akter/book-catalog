import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  _id: string;
  title: string;
  author: string;
  status: 'wishlist' | 'reading' | 'finished';
}

interface WishlistState {
  books: Book[];
}

const initialState: WishlistState = {
  books: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBookStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'reading' | 'finished' }>
    ) => {
      const book = state.books.find((b) => b._id === action.payload.id);
      if (book) {
        book.status = action.payload.status;
      }
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((b) => b._id !== action.payload);
    },
  },
});

export const { addBook, updateBookStatus, removeBook } = wishlistSlice.actions;
export default wishlistSlice.reducer;
