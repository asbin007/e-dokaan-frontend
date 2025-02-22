import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import store from "../../../../store/store"
import AdminDashboard from "../../AdminLayout"
import CategoryTable from "./Table"
import { fetchingCategory } from "../../../../store/adminCategorySlice"



function Categories(){
    const dispatch=useAppDispatch()


    const {items:category}=useAppSelector((store)=>store.category)
    useEffect(()=>{
        dispatch(fetchingCategory())
    },[])
    return (
        <AdminDashboard>
            <CategoryTable category={category} />

        </AdminDashboard>
    )
}

export default Categories