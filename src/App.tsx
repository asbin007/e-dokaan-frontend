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

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
