type ProductListProps = {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  handledelete: (id: number) => void;
  isLoading: boolean;
  isLoadingDelete: null | number;
  error: any | null;
  disabled: boolean;
};
// import { useNavigate } from "react-router-dom";
import type { IProducts } from "../../types";
import ProductData from "./ProductData";
import TableHead from "./TableHead";
import Loading from "./Loading";

const ProductList = ({
  disabled,
  error,
  isLoadingDelete,
  isLoading,
  handledelete,
  products,
  setProducts,
}: ProductListProps) => {
  return (
    <>
      {error && !isLoading && (
        <p className="absolute top-[50%] right-[45%]">
          Unexpected Error. please try again...{error}
        </p>
      )}
      {isLoading && <Loading />}

      <div className="container mx-auto">
        <div className="max-h-[600px] overflow-y-auto border border-gray-300">
          <table className="w-full border-collapse text-center font-poppins">
            <thead className="sticky -top-[0.5px] bg-white z-10">
              <TableHead setProducts={setProducts} />
            </thead>
            {!isLoading && (
              <tbody>
                {products.map((product) => (
                  <ProductData
                    disabled={disabled}
                    isLoadingDelete={isLoadingDelete}
                    key={product.id}
                    product={product}
                    handledelete={handledelete}
                    setProducts={setProducts}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
