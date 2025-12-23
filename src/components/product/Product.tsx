import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import type { IAuthUser, IProduct } from "../../types";
import ProductList from "./ProductList";
import CreateProduct from "./crud-operation/CreateProduct";
import { RefreshAccessToken } from "../RefreshAccessToken";
import AuthUserData from "./AuthUserData";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { UseDebounce } from "../UseDebounce";

const Product = () => {
  const [disabled, setDisabled] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<null | number>(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [authUser, setAuthUser] = useState<IAuthUser>();
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const debouncedSearch = UseDebounce(search, 500);

  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setSearchParams({ page: String(selectedPage) });
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthUser(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          const newToken = await RefreshAccessToken();

          if (!newToken) {
            return null;
          }

          const response = await axios.get(`${BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
          setAuthUser(response.data);
        }
      }
    };
    getProfile();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products?limit=30&skip=${page * 30 - 30}`
        );
        console.log(response.data.products);

        if (response && response.data.products) {
          setProducts(response.data.products);
          setTotalPages(Math.ceil(response?.data?.total / 30));
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

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

  useEffect(() => {
    fetchSearch(debouncedSearch);
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handledelete = async (id: number) => {
    try {
      setDisabled(true);
      setIsLoadingDelete(id);
      await axios.delete(`${BASE_URL}/products/${id}`);
      const deletePro = products.filter((del) => del.id !== id);
      setProducts(deletePro);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDelete(null);
      setDisabled(false);
    }
  };

  return (
    <>
      {authUser && <AuthUserData authUser={authUser} />}
      <CreateProduct
        products={products}
        setProducts={setProducts}
        handleChange={handleChange}
        search={search}
      />
      <ProductList
        disabled={disabled}
        error={error}
        isLoadingDelete={isLoadingDelete}
        isLoading={isLoading}
        handledelete={handledelete}
        products={products}
        setProducts={setProducts}
      />
      {!isLoading && (
        <Pagination
          page={page}
          totalPages={totalPages}
          selectPageHandler={selectPageHandler}
        />
      )}
    </>
  );
};

export default Product;
