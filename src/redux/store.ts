import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import bookReducer from './features/book/bookSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
