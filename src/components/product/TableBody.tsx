type TableBodyProps = {
  product: IProduct;
  handledelete: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  isLoadingDelete: number | null;
  disabled: boolean;
};

import { Pencil } from "lucide-react";
import type { IProduct } from "../../types";
import Modal from "./crud-operation/Modal";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import ProductForm from "./crud-operation/ProductForm";

const TableBody = ({
  disabled,
  isLoadingDelete,
  handledelete,
  product,
  setProducts,
}: TableBodyProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (newProduct: IProduct) => {
    const id = product.id;
    const response = await axios.patch(
      `${BASE_URL}/products/${id}`,
      newProduct
    );
    setProducts((product) =>
      product.map((p) => (p.id === id ? { ...p, ...response.data } : p))
    );
  };

  return (
    <>
      <tr className="border text-base border-gray-300">
        <td className="w-64 whitespace-nowrap  py-3 pt-4 text-left pl-2 flex gap-3 items-center">
          <p>{product.title}</p>
          <button onClick={() => setOpen(true)}>
            <Pencil className="w-5 cursor-pointer hover:scale-130 transition-transform duration-300 ease-in-out" />
          </button>
        </td>
        <td className="">{product.stock}</td>
        <td className="">{product.availabilityStatus}</td>
        <td className="">${product.price} US</td>
        <td>{product.discountPercentage}%</td>
        <td className="">
          <button
            disabled={disabled}
            onClick={() => handledelete(product.id)}
            className={`rounded-2xl cursor-pointer my-1.5 text-white text-base px-7 py-3 inline-flex justify-center w-[100px] hover:scale-105 transition-transform duration-300 ease-in-out
              ${isLoadingDelete === product.id ? "bg-red-700" : "bg-red-600"}`}
          >
            {isLoadingDelete === product.id ? "Deleting.." : "Delete"}
          </button>
        </td>
      </tr>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ProductForm
          handleSubmitForm={handleSubmitForm}
          product={product}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};

export default TableBody;
