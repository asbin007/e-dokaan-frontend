import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import { API, APIWithToken } from "../http";
import { RootState } from "./store";

export interface IProductAdmin {
  id: string;
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  productImgUrl: string;
  createAt: string;
  categoryId: string;
  discount: number;

  Category: {
    categoryName: string;
  };
}

interface IInitialState {
  products: IProductAdmin[];
  status: Status;
  product: null | IProductAdmin;
}

const initialState: IInitialState = {
  products: [],
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setProducts(state: IInitialState, action: PayloadAction<IProductAdmin[]>) {
      state.products = action.payload;
    },
    setStatus(state: IInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setSingleProduct(
      state: IInitialState,
      action: PayloadAction<IProductAdmin>
    ) {
      state.product = action.payload;
    },
    addProductToProducts(
      state: IInitialState,
      action: PayloadAction<IProductAdmin>
    ) {
      state.products.push(action.payload);
    },
  },
});

export const {
  setProducts,
  setSingleProduct,
  addProductToProducts,
  setStatus,
} = productSlice.actions;

export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.get("/product");
      if (response.status === 200) {
        dispatch(setProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.error(error);
    }
  };
}

export function addProduct(data: IProductAdmin) {
  return async function addProductThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWithToken.post("/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(addProductToProducts(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
        console.log(response.data.message);
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchAdminProduct(id: string) {
  return async function fetchAdminProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const store = getState();
    const productExits = store.adminProducts.products.find(
      (product: IProductAdmin) => product.id == id
    );
    if (productExits) {
      dispatch(setProducts(productExits));
      dispatch(setStatus(Status.SUCCESS));
    } else {
      try {
        const response = await API.get("/product/" + id);
        if (response.status === 200) {
          dispatch(setStatus(Status.SUCCESS));
          dispatch(setSingleProduct(response.data.data));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } catch (error) {
        dispatch(setStatus(Status.ERROR));
        console.log(error);
      }
    }
  };
}
