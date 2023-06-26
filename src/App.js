import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Details from "./components/Details";

function App() {
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.length;

  return (
    <div>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:productId" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
