type EditProductProps = {
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProducts;
};

import axios from "axios";
import { useState } from "react";
import type { IProducts } from "../../../types";
import { BASE_URL } from "../../../constants";

const EditProduct = ({
  id,
  setProducts,
  setOpen,
  product,
}: EditProductProps) => {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [stock, setStock] = useState(product.stock.toString());
  const [status, setStatus] = useState(product.availabilityStatus);
  const [price, setPrice] = useState(product.price.toString());
  const [discount, setDiscount] = useState(
    product.discountPercentage.toString()
  );
  const [error, setError] = useState(null);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setDisabled(true);
      const response = await axios.patch(`${BASE_URL}/products/${id}`, {
        title: title,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-[poppins] text-center mb-4">Edit Product</h2>

      {error && (
        <p className="text-center text-xl text-red-900">
          Error adding product- <br /> {error}
        </p>
      )}

      <form className="flex flex-col gap-6 mt-4" onSubmit={handlesubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700 text-start">
            Product Title:
          </label>
          <input
            className="border pl-3 py-3 rounded-2xl w-full"
            type="text"
            value={title}
            placeholder="Product Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 text-start">
              Stock Quantity:
            </label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              value={stock}
              placeholder="Stocks Quantity"
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 text-start">
              Availability Status:
            </label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="text"
              value={status}
              placeholder="Availability Status"
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 text-start">
              Product Price:
            </label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 text-start">
              Discount (%):
            </label>
            <input
              className="border pl-3 py-3 rounded-2xl w-full"
              type="number"
              value={discount}
              placeholder="Discount %"
              onChange={(e) => setDiscount(e.target.value)}
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
          {isLoading && <p>Saving Changes...</p>}
          {!isLoading && <p>Save Changes</p>}
        </button>
      </form>
    </>
  );
};

export default EditProduct;
