import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import type { IAuthUser, IProducts } from "../../../types";
import ProductList from "../ProductList";
import ButtonLinks from "../ButtonLinks";
import CreateProduct from "../crud-operation/CreateProduct";
import { RefreshAccessToken } from "../../RefreshAccessToken";
import AuthUserData from "../AuthUserData";

const Product2 = () => {
  const [disabled, setDisabled] = useState(false);

  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<null | number>(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [authUser, setAuthUser] = useState<IAuthUser>();

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
      setDisabled(true);

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
        handleChange={handleChange}
        search={search}
        products={products}
        setProducts={setProducts}
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
      <ButtonLinks />
    </>
  );
};

export default Product2;
