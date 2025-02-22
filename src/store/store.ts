import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartlSlice"; // Fixed typo
import adminCategorySlice from "./adminCategorySlice";
import orderSlice from "./checkoutSlice" // Added new slice for orders
const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
    category: adminCategorySlice
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
