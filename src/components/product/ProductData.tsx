type ProductData = {
  product: IProduct;
  handledelete: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  isLoadingDelete: null | number;
  disabled: boolean;
};

import type { IProduct } from "../../types";
import TableBody from "./TableBody";

const ProductData = ({
  disabled,
  isLoadingDelete,
  handledelete,
  product,
  setProducts,
}: ProductData) => {
  return (
    <TableBody
      disabled={disabled}
      isLoadingDelete={isLoadingDelete}
      product={product}
      handledelete={handledelete}
      setProducts={setProducts}
    />
  );
};

export default ProductData;
