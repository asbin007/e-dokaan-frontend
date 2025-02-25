import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AdminLayout from "../AdminLayout";
import { fetchProducts } from "../../../store/adminProductSlice";
import ProductTable from "./components/ProductTable";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store.adminProducts);
  useEffect(() => {
    dispatch(fetchProducts());
  },[]);
  return (
    <AdminLayout>
      <ProductTable products={products} />
    </AdminLayout>
  );
};

export default Products;
