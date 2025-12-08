type ProductData = {
  product: IProducts;
  handledelete: (id: number) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  isLoadingDelete: null | number;
};

import type { IProducts } from "../../types";
import TableBody from "./TableBody";

const ProductData = ({
  isLoadingDelete,
  handledelete,
  product,
  setProducts,
}: ProductData) => {
  return (
    <TableBody
      isLoadingDelete={isLoadingDelete}
      product={product}
      handledelete={handledelete}
      setProducts={setProducts}
    />
  );
};

export default ProductData;
