type ProductListProps = {
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
};

import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import type { IProducts } from "../../types";

const TableHead = ({ setProducts }: ProductListProps) => {
  const [openPrice, setOpenPrice] = useState<null | boolean>(null);
  const [openStock, setOpenStock] = useState<null | boolean>(null);
  const [openTitle, setOpenTitle] = useState<null | boolean>(null);

  const fetchOriginal = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPriceAsc = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=price&order=asc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPriceDes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=price&order=desc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStockAsc = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=stock&order=asc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStockDes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=stock&order=desc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTitleAsc = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=title&order=asc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTitleDes = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/products?sortBy=title&order=desc`
      );
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickPrice = () => {
    if (openPrice === null) {
      fetchPriceAsc();
      setOpenPrice(true);
    } else if (openPrice === true) {
      fetchPriceDes();
      setOpenPrice(false);
    } else if (openPrice === false) {
      fetchOriginal();
      setOpenPrice(null);
    }
  };

  const handleClickStock = () => {
    if (openStock === null) {
      fetchStockAsc();
      setOpenStock(true);
    } else if (openStock === true) {
      fetchStockDes();
      setOpenStock(false);
    } else if (openStock === false) {
      fetchOriginal();
      setOpenStock(null);
    }
  };

  const handleClickTitle = () => {
    if (openTitle === null) {
      fetchTitleAsc();
      setOpenTitle(true);
    } else if (openTitle === true) {
      fetchTitleDes();
      setOpenTitle(false);
    } else if (openTitle === false) {
      fetchOriginal();
      setOpenTitle(null);
    }
  };

  return (
    <tr className="text-2xl border bg-gray-200 px-2 border-gray-300">
      <th className="text-left pl-4 py-2 ">
        <button
          className="hover:scale-115 transition-transform duration-300 ease-in-out flex cursor-pointer items-center gap-1"
          onClick={handleClickTitle}
        >
          <div>Product Title</div>
          <div>
            {openTitle === false && <ChevronUp />}
            {openTitle && <ChevronDown />}
          </div>
        </button>
      </th>
      <th className="cursor-pointer flex items-center py-2 justify-center gap-2.5">
        <button
          className="hover:scale-115 transition-transform duration-300 ease-in-out flex cursor-pointer items-center gap-1"
          onClick={handleClickStock}
        >
          <div>Stocks Quantity</div>
          <div>
            {openStock === false && <ChevronUp />}
            {openStock && <ChevronDown />}
          </div>
        </button>
      </th>
      <th className="">Availability Status</th>
      <th className="cursor-pointer flex items-center py-2 justify-center gap-2.5">
        <button
          className="hover:scale-115 transition-transform duration-300 ease-in-out flex cursor-pointer items-center gap-1"
          onClick={handleClickPrice}
        >
          <div>Price</div>
          <div>
            {openPrice === false && <ChevronUp />}
            {openPrice && <ChevronDown />}
          </div>
        </button>
      </th>
      <th className="">Discount Percentage</th>
      <th>Action</th>
    </tr>
  );
};

export default TableHead;
