import { useState } from "react";
import type { IProduct } from "../../../types";
import Spinner from "../../Spinner";

type CreateEditProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: IProduct;
  handleSubmitForm: (data: IProduct) => Promise<void>;
};

const ProductForm = ({
  product,
  setOpen,
  handleSubmitForm,
}: CreateEditProps) => {
  const defaultProduct = {
    title: "",
    availabilityStatus: "",
    stock: "",
    price: "",
    discountPercentage: "",
  };
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState(
    product
      ? {
          title: product?.title,
          availabilityStatus: product?.availabilityStatus,
          stock: product?.stock,
          price: product?.price,
          discountPercentage: product?.discountPercentage,
        }
      : defaultProduct
  );

  const handleChange = (e: any) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setDisabled(true);
      await handleSubmitForm(newProduct as IProduct);
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
        {product && <p>Edit Product </p>}
        {!product && <p>Create a Product</p>}
      </h2>

      {error && (
        <p className="text-center text-xl text-red-900">
          {product ? (
            <p>
              Error editing product- <br /> {error}
            </p>
          ) : (
            <p>
              Error adding product- <br /> {error}
            </p>
          )}
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
            name="title"
            value={newProduct.title}
            placeholder="Product Title"
            onChange={handleChange}
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
              name="stock"
              value={newProduct.stock}
              placeholder="Stocks Quantity"
              onChange={handleChange}
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
              name="availabilityStatus"
              value={newProduct.availabilityStatus}
              placeholder="Availability Status"
              onChange={handleChange}
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
              name="price"
              value={newProduct.price}
              placeholder="Price"
              onChange={handleChange}
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
              name="discountPercentage"
              value={newProduct.discountPercentage}
              placeholder="Discount %"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          disabled={disabled}
          className={`bg-blue-600 cursor-pointer hover:scale-[1.02] transition py-3 rounded-2xl text-white font-medium mt-4 ${
            isLoading && "bg-blue-600/70"
          } `}
          type="submit"
        >
          <div className="flex items-center justify-center gap-4">
            <div> Save</div>
            <div> {isLoading && <Spinner />}</div>
          </div>
        </button>
      </form>
    </>
  );
};

export default ProductForm;
