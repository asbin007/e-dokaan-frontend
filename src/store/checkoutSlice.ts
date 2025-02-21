import { IData, IOrderItems } from "./../pages/checkout/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import { APIWithToken } from "../http";
import { IOrderDetail, OrderStatus } from "../pages/my-orders/types";

interface IOrderResponse {
  data: IOrderItems[];
  url: string | null;
}

interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
  orderDetails: IOrderDetail[];
}

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setOrderDetails(state: IOrder, action: PayloadAction<IOrderDetail[]>) {
      state.orderDetails = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string | null>) {
      state.khaltiUrl = action.payload;
    },
    setUpdateToCancel(
      state: IOrder,
      action: PayloadAction<{ orderId: string }>
    ) {
      const orderId = action.payload.orderId;
      const index = state.orderDetails.find(
        (oreder) => oreder.orderId === orderId
      );
      index ? index.Order.orderStatus === OrderStatus.Cancelled : "";
    },
  },
});

export default orderSlice.reducer;
const {
  setItems,
  setStatus,
  setKhaltiUrl,
  setOrderDetails,
  setUpdateToCancel,
} = orderSlice.actions;

export function orderItem(data: IData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.post("/order", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url));
          window.location.href = response.data.url;
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.get("/order");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchMyorderDetails(id: string) {
  return async function fetchMyorderDetailsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.get(`/order/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrderDetails(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function cancelOrder(id: string) {
  return async function cancelOrderThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.patch("/order/cancel-order" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUpdateToCancel({ orderId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
