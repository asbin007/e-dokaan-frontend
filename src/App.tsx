import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/user/Register";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home/Home";
import Login from "./pages/user/Login";
import Product from "./pages/products/Product";
import SingleProduct from "./pages/singleProduct/SingleProduct";
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
