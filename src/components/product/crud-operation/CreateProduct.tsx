type CreateProductProps = {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
};

import { useState } from "react";
import Modal from "./Modal";
import CreateProductModal from "./CreateProductModal";
import type { IProducts } from "../../../types";

const CreateProduct = ({ products, setProducts }: CreateProductProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto my-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-[poppins]">B1sh</p>
          </div>
          <div>
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer bg-blue-600 text-xl font-[poppins] text-white px-7 py-3 rounded-2xl"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <CreateProductModal products={products} setProducts={setProducts} />
      </Modal>
    </>
  );
};

export default CreateProduct;
