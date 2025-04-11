import { useEffect } from "react";
import Navbar from "../../globals/components/Navbar";
import Card from "./componets/Card";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";

function Product() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((store) => store.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-xl text-gray-600">Loading products...</div>
      </>
    );
  }

  if (status === "failed") {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-xl text-red-500">Failed to load products.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        <section
          id="Projects"
          className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
        >
          {products.length > 0 &&
            products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </section>
      </div>
    </>
  );
}

export default Product;
