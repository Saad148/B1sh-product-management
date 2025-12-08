type TableBodyProps = {
  product: IProducts;
  handledelete: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  isLoadingDelete: number | null;
};

import { Pencil } from "lucide-react";
import type { IProducts } from "../../types";
import Modal from "./crud-operation/Modal";
import { useState } from "react";
import EditProduct from "./crud-operation/EditProduct";

const TableBody = ({
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
            <Pencil className="w-5 cursor-pointer" />
          </button>
        </td>
        <td className="">{product.stock}</td>
        <td className="">{product.availabilityStatus}</td>
        <td className="">${product.price} US</td>
        <td>{product.discountPercentage}%</td>
        <td>
          <button
            onClick={() => handledelete(product.id)}
            className="rounded-2xl cursor-pointer my-1.5 bg-red-600 text-white text-base px-7 py-3"
          >
            {isLoadingDelete === product.id ? "Deleting..." : "Delete"}
          </button>
        </td>
      </tr>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <EditProduct
          setOpen={setOpen}
          id={product.id}
          setProducts={setProducts}
        />
      </Modal>
    </>
  );
};

export default TableBody;
