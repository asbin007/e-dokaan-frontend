import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentMethod } from "../pages/checkout/types";
import { IOrderDetail, PaymentStatus } from "../pages/my-orders/types";
import { Status } from "../globals/types";
import { AppDispatch } from "./store";
import { APIWithToken } from "../http";
export interface IAdminOrder{
    id:string,
    productQty:number,
    orderStatus?:string,
    totalAmount?:number,
    Payment?:{
        paymentMethod:PaymentMethod,
        paymentStatus:PaymentStatus,
    }

    
}
interface IInititalState{
    items:IAdminOrder[],
    status:Status,
    orderDetails:IOrderDetail[]
}
const initialState:IInititalState={
    status:Status.LOADING,
    items:[],
    orderDetails:[]
}

const orderSlice=createSlice({
    name:"adminOrder",
    initialState,
    reducers:{
        setItems(state:IInititalState,action:PayloadAction<IAdminOrder[]>){
            state.items=action.payload

        },
        setOrderDetails(state:IInititalState,action:PayloadAction<IOrderDetail[]>){
            state.orderDetails=action.payload

        },
        setStatus(state:IInititalState,action:PayloadAction<Status>){
            state.status=action.payload
        },
    }
})

export const {setItems,setStatus,setOrderDetails}=orderSlice.actions
export default orderSlice.reducer

export function fetchOrder(){
    return async function fetchOrderThunk(dispatch:AppDispatch){
        try {
            const res=await APIWithToken.get('/order/all')
            if(res.status===200){
                dispatch(setItems(res.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function fetchAdminOrderDetails(orderId:string){
    return async function fetchAdminOrderDetailsThunk(dispatch:AppDispatch){
        try {
            const res=await APIWithToken.get(`/order/${orderId}`)
            if(res.status===200){
                dispatch(setOrderDetails(res.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}