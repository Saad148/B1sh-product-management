type ProductModalProps = {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

import { useState } from "react";
import axios from "axios";
import type { IProducts } from "../../../types";
import { BASE_URL } from "../../../constants";

const CreateProductModal = ({
  products,
  setProducts,
  setOpen,
}: ProductModalProps) => {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      setDisabled(true);
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

      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-[poppins] text-center mb-4">
        Create a Product
      </h2>

      {error && (
        <p className="text-center text-xl text-red-900">
          Error Creating product- <br /> {error}
        </p>
      )}

      <form className="flex flex-col gap-6 mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Product Title:</label>
          <input
            className="border pl-3 py-3 rounded-2xl w-full"
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Stock Quantity:</label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              name="stock"
              placeholder="Stocks Quantity"
              value={newProduct.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">
              Availability Status:
            </label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="text"
              name="availabilityStatus"
              placeholder="Availability Status"
              value={newProduct.availabilityStatus}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Product Price:</label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Discount (%):</label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              name="discountPercentage"
              placeholder="Discount %"
              value={newProduct.discountPercentage}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          disabled={disabled}
          className={`bg-blue-600  cursor-pointer hover:scale-[1.02] transition py-3 rounded-2xl text-white font-medium mt-4 ${
            isLoading ? "bg-blue-800" : "bg-blue-600"
          } `}
          type="submit"
        >
          {isLoading && <p>Adding Product...</p>}
          {!isLoading && <p>Add New Product</p>}
        </button>
      </form>
    </>
  );
};

export default CreateProductModal;
