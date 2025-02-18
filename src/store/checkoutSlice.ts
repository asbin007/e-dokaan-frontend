import { IData, IOrderItems } from "./../pages/checkout/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types";
import { setItems } from "./cartlSlice";
import { AppDispatch } from "./store";
import { APIWithToken } from "../http";

interface IOrderResponse {
  data: IOrderItems[];
  url: string | null;
}

interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
}

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
    state.khaltiUrl = action.payload;
    },
  },
});
export const { setItems, setStatus, setKhaltiUrl } = orderSlice.actions;
export default orderSlice.reducer;

export function orderItem(data: IData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.post<IOrderResponse>("/order", data);
      if (response.status === 200) {
        dispatch(setItems(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url));
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Order API Error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
