// type CreateEditProps = {
//   setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
//   mode: string;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   products?: IProduct[];
//   product?: IProduct;
//   id?: number;
// };

// import { useState } from "react";
// import type { IProduct } from "../../../types";
// import axios from "axios";
// import { BASE_URL } from "../../../constants";

// const CreateEditProduct = ({
//   id,
//   product,
//   setOpen,
//   mode,
//   products,
//   setProducts,
// }: CreateEditProps) => {
//   const [disabled, setDisabled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [newProduct, setNewProduct] = useState(
//     mode === "create"
//       ? {
//           title: "",
//           availabilityStatus: "",
//           stock: "",
//           price: "",
//           discountPercentage: "",
//         }
//       : {
//           title: product?.title,
//           availabilityStatus: product?.availabilityStatus,
//           stock: product?.stock,
//           price: product?.price,
//           discountPercentage: product?.discountPercentage,
//         }
//   );

//   const handleChange = (e: any) => {
//     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
//   };

//   const handlesubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       setDisabled(true);
//       if (mode === "create") {
//         const response = await axios.post(
//           `${BASE_URL}/product/add`,
//           newProduct
//         );
//         const uniqueId = {
//           ...response.data,
//           id: Date.now(),
//           availabilityStatus: newProduct.availabilityStatus,
//         };
//         if (products) setProducts([uniqueId, ...products]);
//         setNewProduct({
//           title: "",
//           availabilityStatus: "",
//           stock: "",
//           price: "",
//           discountPercentage: "",
//         });
//       }

//       if (mode === "edit") {
//         const response = await axios.patch(
//           `${BASE_URL}/products/${id}`,
//           newProduct
//         );
//         setProducts((product) =>
//           product.map((p) => (p.id === id ? { ...p, ...response.data } : p))
//         );
//       }

//       setOpen(false);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-3xl font-[poppins] text-center mb-4">
//         {mode === "edit" && <p>Edit Product </p>}
//         {mode === "create" && <p>Create a Product</p>}
//       </h2>

//       {error && (
//         <p className="text-center text-xl text-red-900">
//           {mode === "create" && (
//             <p>
//               Error adding product- <br /> {error}
//             </p>
//           )}
//           {mode === "edit" && (
//             <p>
//               Error editing product- <br /> {error}
//             </p>
//           )}
//         </p>
//       )}

//       <form className="flex flex-col gap-6 mt-4" onSubmit={handlesubmit}>
//         <div className="flex flex-col gap-1">
//           <label className="font-medium text-gray-700 text-start">
//             Product Title:
//           </label>
//           <input
//             className="border pl-3 py-3 rounded-2xl w-full"
//             type="text"
//             name="title"
//             value={newProduct.title}
//             placeholder="Product Title"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700 text-start">
//               Stock Quantity:
//             </label>
//             <input
//               className="border pl-3 py-3 rounded-2xl w-full"
//               type="number"
//               name="stock"
//               value={newProduct.stock}
//               placeholder="Stocks Quantity"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700 text-start">
//               Availability Status:
//             </label>
//             <input
//               className="border pl-3 py-3 rounded-2xl w-full"
//               type="text"
//               name="availabilityStatus"
//               value={newProduct.availabilityStatus}
//               placeholder="Availability Status"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700 text-start">
//               Product Price:
//             </label>
//             <input
//               className="border pl-3 py-3 rounded-2xl w-full"
//               type="number"
//               name="price"
//               value={newProduct.price}
//               placeholder="Price"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700 text-start">
//               Discount (%):
//             </label>
//             <input
//               className="border pl-3 py-3 rounded-2xl w-full"
//               type="number"
//               name="discountPercentage"
//               value={newProduct.discountPercentage}
//               placeholder="Discount %"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <button
//           disabled={disabled}
//           className={`bg-blue-600  cursor-pointer hover:scale-[1.02] transition py-3 rounded-2xl text-white font-medium mt-4 ${
//             isLoading ? "bg-blue-800" : "bg-blue-600"
//           } `}
//           type="submit"
//         >
//           {isLoading && mode === "create" && <p>Creating Product...</p>}
//           {!isLoading && mode === "create" && <p>Create</p>}

//           {isLoading && mode === "edit" && <p>Saving Changes...</p>}
//           {!isLoading && mode === "edit" && <p>Save Changes</p>}
//         </button>
//       </form>
//     </>
//   );
// };

// export default CreateEditProduct;
