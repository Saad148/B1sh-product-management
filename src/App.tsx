import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./utils-protectedroute";
import Product from "./components/product/Product";
import Home from "./components/Home";
import Product2 from "./components/product/pagination/Product2";
import Product3 from "./components/product/pagination/Product3";
import Product4 from "./components/product/pagination/Product4";
import Product5 from "./components/product/pagination/Product5";
import PublicRoute from "./utils-publicroute";
import WrongRoutePage from "./components/WrongRoutePage";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<Product />} />
        <Route path="/products/2" element={<Product2 />} />
        <Route path="/products/3" element={<Product3 />} />
        <Route path="/products/4" element={<Product4 />} />
        <Route path="/products/5" element={<Product5 />} />
      </Route>
      <Route path="*" element={<WrongRoutePage />}></Route>
    </Routes>
  );
}

export default App;
