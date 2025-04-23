import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/user/Register";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home/Home";
import Login from "./pages/user/Login";
import Product from "./pages/products/Product";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import MyCart from "./pages/cart/my-cart";
import Checkout from "./pages/checkout/Checkout";
import MyOrder from "./pages/my-orders/MyOrder";
import MyOrderDetails from "./pages/my-orders/MyOrderDetails";
import Categories from "./pages/admin/categories/components/Categories";
import AdminStats from "./pages/admin/stats/AdminStats";
import Users from "./pages/admin/users/Users";
import Products from "./pages/admin/products/Products";
import AdminOrder from "./pages/admin/orders/AdminOrder";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/my-orders/:id" element={<MyOrderDetails />} />
          <Route path="/admin" element={<AdminStats />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<AdminOrder />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
