// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { allDeliveryProductsCountHub } from "@/lib/api/tomorrowOrderApi";

// interface TotalProductsCount {
//   totalCount: string;
//   productId: number;
//   product: Product | null;
// }

// interface Product {
//   productImages: string;
//   productName: string;
// }

// const TomorrowOrder = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [productCount, setProductCount] = useState<TotalProductsCount | null>(
//     null
//   ); // Allow null initially

//   // Hub It splitting
//   const hubuserIdSplit = useSelector(
//     (state: RootState) => state.auth.existingUser
//   );
//   const hubuserId = hubuserIdSplit?.id;

//   const today = new Date(); // Get today's date object
//   const tomorrow = new Date(today); // Create a copy of today's date
//   tomorrow.setDate(tomorrow.getDate() + 1); // Add one day

//   const deliveryDay = tomorrow.toISOString().split("T")[0]; // Format to YYYY-MM-DD

//   console.log("tomorrow's date:", deliveryDay);

//   // Fetch data
//   const fetchProductCount = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await allDeliveryProductsCountHub(hubuserId, deliveryDay);
//       setProductCount(data?.totalProductsCount); // Use the object directly
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [hubuserId, deliveryDay]); // Dependencies listed here

//   useEffect(() => {
//     fetchProductCount();
//   }, [fetchProductCount]);

//   console.log("productCount", productCount);

//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4">
//         {/* <div className="bg-slate-50 rounded border-2 border-[#FFA500] shadow-xl shadow-black/5"> */}
//         <div className="bg-blue-100 rounded-xl border-2 border-blue-400 shadow-xl shadow-black/5">
//           <div className="px-4 flex flex-col align-middle rounded-xl justify-center h-32 shadow">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
//               />
//             </svg>

//             <h1 className="font-semibold font-[family-name:var(--interSemiBold)] pt-2">
//               Total Users
//             </h1>
//             <h5 className="font-regular font-[family-name:var(--interRegular)] pt-2">
//               {/* {users ? users.usersCount : 0}  */}
//             </h5>
//           </div>
//         </div>
//         <div className="rounded-xl border-2 bg-green-100 border-green-400 shadow-xl shadow-black/5">
//           <div className="px-4 flex flex-col align-middle rounded-xl justify-center h-32 shadow">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
//               />
//             </svg>

//             <h1 className="font-semibold font-[family-name:var(--interSemiBold)] pt-2">
//               Total Orders
//             </h1>
//             <h5 className="font-regular font-[family-name:var(--interRegular)] pt-2">
//               {/* {orders ? orders.checkOutCount : 0}  */}
//             </h5>
//           </div>
//         </div>
//         <div className="bg-pink-100 rounded-xl border-2  border-pink-400 shadow-xl shadow-black/5">
//           <div className="px-4 flex flex-col align-middle rounded-xl justify-center h-32 shadow">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
//               />
//             </svg>

//             <h1 className="font-semibold font-[family-name:var(--interSemiBold)] pt-2">
//               Total Delivery Persons
//             </h1>
//             <h5 className="font-regular font-[family-name:var(--interRegular)] pt-2">
//               {/* {deliveryUsers ? deliveryUsers.deliveryUserCount : 0} */}
//             </h5>
//           </div>
//         </div>
//         <div className="bg-violet-100 rounded-xl border-2  border-violet-400 shadow-xl shadow-black/5">
//           <div className="px-4 flex flex-col align-middle rounded-xl justify-center h-32 shadow">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-10"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
//               />
//             </svg>

//             <h1 className="font-semibold font-[family-name:var(--interSemiBold)] pt-2">
//               Total Subscription
//             </h1>
//             <h5 className="font-regular font-[family-name:var(--interRegular)] pt-2">
//               {/* {Subscriptions ? Subscriptions.subscriptionCount : 0} */}
//             </h5>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TomorrowOrder;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { allDeliveryProductsCountHub } from "@/lib/api/tomorrowOrderApi";
import Image from "next/image";

interface TotalProductsCount {
  totalCount: string;
  productId: number;
  product: Product | null;
}

interface Product {
  productImages: string;
  productName: string;
}

const TomorrowOrder = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<TotalProductsCount[] | null>(
    null
  ); // Allow null initially, and make it an array

  // Hub It splitting
  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit?.id;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  // const deliveryDay = tomorrow.toISOString().split("T")[0];
  const deliveryDay = today.toISOString().split("T")[0];

  console.log("tomorrow's date:", deliveryDay);

  // Fetch data
  const fetchProductCount = useCallback(async () => {
    setLoading(true);
    try {
      const data = await allDeliveryProductsCountHub(hubuserId, deliveryDay);
      setProductCount(data?.totalProductsCount || null); // Use the object directly, and handle null
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, deliveryDay]);

  useEffect(() => {
    fetchProductCount();
  }, [fetchProductCount]);

  console.log("productCount", productCount);

  const groupedProducts = useCallback(() => {
    if (!productCount) return null;

    const grouped = productCount.reduce(
      (acc: any, curr: TotalProductsCount) => {
        const { productId, product, totalCount } = curr;
        const existingProduct = acc.find((p: any) => p.productId === productId);

        if (existingProduct) {
          existingProduct.totalCount += parseInt(totalCount, 10);
        } else {
          acc.push({
            productId,
            productImages: product?.productImages || "",
            totalCount: parseInt(totalCount, 10),
            productName: product?.productName || ""
          });
        }
        return acc;
      },
      []
    );

    return grouped;
  }, [productCount]);

  const groupedData = groupedProducts();

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : groupedData ? (
          groupedData.map((product: any) => (
            <div
              key={product.productId}
              className="rounded-xl border-2 bg-green-100 border-green-400 shadow-xl shadow-black/5"
            >
              <div className="px-2 flex items-center justify-start gap-2 h-32 shadow">
                <div>
                  <Image
                    src={product.productImages}
                    alt={`Product ${product.productId}`}
                    width={80} // Adjust width as needed
                    height={80} // Adjust height as needed
                    className="rounded"
                  />
                </div>
                <div>
                  <h5 className="font-regular font-[family-name:var(--interRegular)] pt-2 ">
                  {product.productName}
                    {/* Total Count */}
                  </h5>
                  <h1 className="font-semibold font-[family-name:var(--interSemiBold)] pt-2">
                    {product.totalCount}
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
};

export default TomorrowOrder;
