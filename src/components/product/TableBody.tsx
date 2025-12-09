type TableBodyProps = {
  product: IProducts;
  handledelete: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  isLoadingDelete: number | null;
  disabled: boolean;
};

import { Pencil } from "lucide-react";
import type { IProducts } from "../../types";
import Modal from "./crud-operation/Modal";
import { useState } from "react";
import EditProduct from "./crud-operation/EditProduct";

const TableBody = ({
  disabled,
  isLoadingDelete,
  handledelete,
  product,
  setProducts,
}: TableBodyProps) => {
  const [open, setOpen] = useState(false);

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
        <EditProduct
          product={product}
          setOpen={setOpen}
          id={product.id}
          setProducts={setProducts}
        />
      </Modal>
    </>
  );
};

export default TableBody;
