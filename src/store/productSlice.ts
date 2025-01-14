import { Product } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const productInfo: Product = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: productInfo,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
      state.products = [
        {
          productName: "wai wai", 
          qty: 22,
        },
      ];
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
