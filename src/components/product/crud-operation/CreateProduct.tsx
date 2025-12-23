type CreateProductProps = {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

import { useState } from "react";
import Modal from "./Modal";
import type { IProduct } from "../../../types";
import { Search } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import ProductForm from "./ProductForm";

const CreateProduct = ({
  products,
  setProducts,
  handleChange,
  search,
}: CreateProductProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (newProduct: IProduct) => {
    const response = await axios.post(`${BASE_URL}/product/add`, newProduct);
    const uniqueId = {
      ...response.data,
      id: Date.now(),
      availabilityStatus: newProduct.availabilityStatus,
    };
    if (products) setProducts([uniqueId, ...products]);
  };

  return (
    <>
      <div className="container mx-auto my-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-[poppins] ">Products</p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <form
              className="text-center mx-auto relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="border border-gray-500 text-base py-2.5 pl-10 pr-10 rounded-xl w-full"
                type="text"
                placeholder="Search Products Here"
                value={search}
                onChange={handleChange}
              />
              <Search className="absolute top-2.5 left-2 w-5" />
            </form>
            <div>
              <button
                onClick={() => setOpen(true)}
                className="hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer bg-blue-600 text-xl font-[poppins] text-white px-7 py-3 rounded-2xl"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ProductForm handleSubmitForm={handleSubmitForm} setOpen={setOpen} />
      </Modal>
    </>
  );
};

export default CreateProduct;
