type ProductModalProps = {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
};

import { useState } from "react";
import axios from "axios";
import type { IProducts } from "../../../types";
import { BASE_URL } from "../../../constants";

const CreateProductModal = ({ products, setProducts }: ProductModalProps) => {
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    availabilityStatus: "",
    stock: "",
    price: "",
    discountPercentage: "",
  });

  const handleChange = (e: any) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/product/add`, newProduct);
      const uniqueId = {
        ...response.data,
        id: Date.now(),
        availabilityStatus: newProduct.availabilityStatus,
      };
      setProducts([uniqueId, ...products]);
      setNewProduct({
        title: "",
        availabilityStatus: "",
        stock: "",
        price: "",
        discountPercentage: "",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-center text-2xl">Create a Product</h2>
      {error && (
        <p className="text-center text-xl text-red-900">
          Error adding product- <br /> {error}
        </p>
      )}
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="text"
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          name="stock"
          placeholder="Stocks Quantity"
          value={newProduct.stock}
          onChange={handleChange}
          required
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="text"
          name="availabilityStatus"
          placeholder="Availability Status"
          value={newProduct.availabilityStatus}
          onChange={handleChange}
          required
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          className="border pl-2 py-3 rounded-2xl"
          type="number"
          name="discountPercentage"
          placeholder="Discount %"
          value={newProduct.discountPercentage}
          onChange={handleChange}
          required
        />
        <button
          className="bg-green-600 cursor-pointer hover:scale-105 mt-5 px-8 rounded-2xl text-white py-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductModal;
