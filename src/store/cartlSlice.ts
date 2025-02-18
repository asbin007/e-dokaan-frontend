import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICartInitialState,
  ICartItem,
  ICartUpdateItem,
} from "../pages/cart/types";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import { APIWithToken } from "../http";

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
    setUpdateCartItems(
      state: ICartInitialState,
      action: PayloadAction<ICartUpdateItem>
    ) {
      const index = state.items.findIndex(
        (item) => item.Product.id === action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    setDeleteCartItem(state: ICartInitialState, action: PayloadAction<string>) {
      const index = state.items.findIndex(item => item.Product.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    }
  },
});

export const { setItems, setStatus, setUpdateCartItems, setDeleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
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
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.get("/cart");
      if (response.status === 200) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleCartItemsUpdate(productId: string, quantity: number) {
  return async function handleCartItemsUpdateThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.patch(`/cart/${productId}`, {
        quantity,
      });
      if (response.status === 200) {
        dispatch(setUpdateCartItems({ productId, quantity }));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function handleCartItemDelete(productId: string) {
  return async function handleCartItemDeleteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.delete(`/cart/${productId}`);
      if (response.status === 200) {
        dispatch(setDeleteCartItem(productId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}