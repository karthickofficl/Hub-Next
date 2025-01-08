"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getSubscriptions } from "@/lib/api/subscriptionApi";
import { Loader } from "@/components/Loader";

// interface Subscription {
//   id: number;
//   productName: string;
//   subscriptionOrderId: string;
//   status: string;
//   totalPrice: string;
// }

interface Product {
    id: number;
    productName: string;
    productDescription: string;
    price: string;
    stockQty: string;
  }
  
  interface Subscription {
    id: number;
    subscriptionOrderId: string;
    status: string;
    totalPrice: string;
    product: Product; // Add this line to include the 'product' object
  }

const SubscriptionHistory = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [subscriptionOrderId, setSubscriptionOrderId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit.id;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSubscriptions(
        hubuserId,
        productName,
        subscriptionOrderId,
        page.toString(),
        limit.toString()
      );
      setSubscriptions(data?.subscriptions || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, productName, subscriptionOrderId, page, limit]); // Dependencies listed here

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Add fetchUsers in the dependency array

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRefresh = () => {
    setProductName("");
    setSubscriptionOrderId("");
    setPage(1);
    fetchUsers();
  };

  console.log("subscriptions", subscriptions);
  
  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-between">
        <h5 className="font-[family-name:var(--interSemiBold)] flex items-center">
          Subscriptions{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          History
        </h5>
        <div className=" items-center grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-8">
          <div className="sm:col-span-3">
            <input
              type="search"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="search"
              placeholder="Order ID"
              value={subscriptionOrderId}
              onChange={(e) => setSubscriptionOrderId(e.target.value)}
              className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-red-700 text-white rounded flex items-center px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto w-full border-spacing-2 p-4 border">
        <thead className="text-left font-semibold">
          <tr className="bg-orange-400 text-white">
            <th className="p-3">S.No</th>
            <th className="p-3">subscription ID</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                {/* Loading users... */}
                <Loader />
              </td>
            </tr>
          ) : subscriptions.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            subscriptions.map((subscription, index) => (
              <tr
                key={subscription.id}
                className="hover:bg-slate-200 border-y border-slate-200"
              >
                <td className="p-2 font-[family-name:var(--interRegular)]">{index + 1 + (page - 1) * limit}</td>
                <td className="p-2 font-[family-name:var(--interRegular)]">{subscription?.subscriptionOrderId}</td>
                <td className="p-2 font-[family-name:var(--interRegular)]">{subscription?.product?.productName}</td>
                <td className="p-2 font-[family-name:var(--interRegular)]">{subscription?.status}</td>
                <td className="p-2 font-[family-name:var(--interRegular)] truncate">{subscription?.totalPrice}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mx-1 p-2 bg-orange-500 text-white rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Prev
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="mx-1 p-2 bg-orange-500 text-white rounded flex items-center"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default SubscriptionHistory;
