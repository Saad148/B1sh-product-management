import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import type { IProducts } from "../../../types";
import ProductList from "../ProductList";
import ButtonLinks from "../ButtonLinks";
import SearchProducts from "../SearchProducts";
import CreateProduct from "../crud-operation/CreateProduct";

const Product2 = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<null | number>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/products?limit=30&skip=30`
        );
        setProducts(response.data.products);
      } catch (err: any) {
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const fetchSearch = async (value: string) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${BASE_URL}/products/search?q=${value}`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchSearch(value);
  };

  const handledelete = async (id: number) => {
    try {
      setIsLoadingDelete(id);

      await axios.delete(`${BASE_URL}/products/${id}`);
      const deletePro = products.filter((del) => del.id !== id);
      setProducts(deletePro);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDelete(null);
    }
  };
  return (
    <>
      <SearchProducts handleChange={handleChange} search={search} />
      <CreateProduct products={products} setProducts={setProducts} />
      <ProductList
        error={error}
        isLoadingDelete={isLoadingDelete}
        isLoading={isLoading}
        handledelete={handledelete}
        products={products}
        setProducts={setProducts}
      />
      <ButtonLinks />
    </>
  );
};

export default Product2;
