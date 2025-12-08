type ProductListProps = {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  handledelete: (id: number) => void;
  isLoading: boolean;
  isLoadingDelete: null | number;
  error: any | null;
};
import { useNavigate } from "react-router-dom";
import type { IProducts } from "../../types";
import ProductData from "./ProductData";
import TableHead from "./TableHead";
import Loading from "./Loading";

const ProductList = ({
  error,
  isLoadingDelete,
  isLoading,
  handledelete,
  products,
  setProducts,
}: ProductListProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {error && !isLoading && (
        <p className="absolute top-[50%] right-[45%]">
          Unexpected Error. please try again...{error}
        </p>
      )}
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <button
          className="border bg-amber-900 px-6 py-3 rounded-2xl text-white cursor-pointer absolute top-0 right-0"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}

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
