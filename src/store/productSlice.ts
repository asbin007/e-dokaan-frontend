import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducts, Status,IProduct } from "../globals/types";
import API from "../http";
import { AppDispatch } from "./store";



const initialState:IProducts={
    products:[],
    status:Status.LOADING


}

const productSlice= createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct(state:IProducts,action:PayloadAction<IProduct[]>){
            state.products=action.payload
        },
        setStatus(state:IProducts,action:PayloadAction<Status>){
            state.status=action.payload
        }

    }


})

export const {setProduct,setStatus}=productSlice.actions
export default productSlice.reducer




export function fetchProducts(){
    return async function fetchProductsThunk(dispatch:AppDispatch){

        try {
            const response= await API.get('/product')
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(response.data.data))
    
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
       

    }
}
