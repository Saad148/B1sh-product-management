type EditProductProps = {
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

import axios from "axios";
import { useState } from "react";
import type { IProducts } from "../../../types";
import { BASE_URL } from "../../../constants";

const EditProduct = ({ id, setProducts, setOpen }: EditProductProps) => {
  const [input, setInput] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState(null);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${BASE_URL}/products/${id}`, {
        title: input,
        stock: stock,
        availabilityStatus: status,
        price: price,
        discountPercentage: discount,
      });
      setProducts((product) =>
        product.map((p) => (p.id === id ? { ...p, ...response.data } : p))
      );
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="text-center">
      <form className="flex flex-col gap-4 mt-4" onSubmit={handlesubmit}>
        <h2 className="text-2xl font-[poppins]">Edit Product</h2>
        {error && (
          <p className="text-center text-xl text-red-900">
            Error adding product- <br /> {error}
          </p>
        )}
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="text"
          placeholder="Product Title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          placeholder="Stocks quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="text"
          placeholder="Availability Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <button
          className="bg-green-600 cursor-pointer hover:scale-105 mt-5 px-8 rounded-2xl text-white py-3"
          type="submit"
        >
          Edit Changes
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
