import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AdminLayout from "../AdminLayout";
import { fetchOrder } from "../../../store/adminOrderSlice";
import AdminOrderTable from "./components/AdminOrderTable";



function AdminOrder(){
    const dispatch=useAppDispatch()
    const {items}=useAppSelector((store)=>store.adminOrder)
    useEffect(()=>{
        dispatch(fetchOrder())
    })
    return (
        <AdminLayout>
            <AdminOrderTable orders={items}/>
        </AdminLayout>
    )
}


export default AdminOrder