import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, Status, IProduct } from "../globals/types";
import API from "../http";
import { AppDispatch ,RootState} from "./store";

const initialState: IProducts = {
  products: [],
  status: Status.LOADING,
  product:null
  
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setSingleProduct(state:IProducts,action:PayloadAction<IProduct>){
    state.product = action.payload;
    }

  },
});

export const { setProduct, setStatus,setSingleProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/product");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProduct(id: string) {
  return async function fetchProductThunk(dispatch: AppDispatch,getState:()=>RootState) {
    const store=getState()
    const productExits=store.products.products.find((product:IProduct)=>product.id===id)
   
   if(productExits){
    dispatch(setProduct(productExits))
    dispatch(setStatus(Status.SUCCESS))

   }
   else
    try {
      const response = await API.get("/product/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleProduct(response.data.data[0]));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
