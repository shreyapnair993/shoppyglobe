// Redux Store - combines all reducers together
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,     // handles cart state
    search: searchReducer, // handles search state
  },
});

export default store;