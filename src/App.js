import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Details from "./components/Details";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import { useState } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.length;
  const [price, setPrice] = useState(0);

  return (
    <div>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart setPrice={setPrice} />} />
        <Route path="/products/:productId" element={<Details />} />
        <Route path="/cart/payment" element={<Payment price={price} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart/payment/orders" element={<Orders />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
