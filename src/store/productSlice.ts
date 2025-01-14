import { Product } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productInfo: Product = {
  products: [],
};
createSlice({
  name: "product",
  initialState: productInfo,
  reducers: {
    setProduct(state: Product, action: PayloadAction<Product>) {
      state.products = [
        {
          productName = "wai wai",
          qty: 22,
        },
      ];
    },
  },
});
export const { setProduct } = productSlice.actions;
export default productSlice.reducer;