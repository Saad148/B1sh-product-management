import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./utils-protectedroute";
import Product from "./components/product/Product";
import Home from "./components/Home";
import PublicRoute from "./utils-publicroute";
import WrongRoutePage from "./components/WrongRoutePage";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<WrongRoutePage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
