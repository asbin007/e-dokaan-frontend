import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInitialState, ICartItem } from "../pages/cart/types";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import  { APIWithToken } from "../http";

const initialState: ICartInitialState = {
  items: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: ICartInitialState, action: PayloadAction<ICartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: ICartInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setItems, setStatus } = cartSlice.actions;
export default cartSlice.reducer;



export function addToCart(productId:String) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.post("/cart", {
        productId: productId,
        quantity: 1,
      });

      if (response.status === 200) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
