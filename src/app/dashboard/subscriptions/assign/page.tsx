"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
//   getCheckout,
  getUnassignedSubscription,
  getDeliveryUsers,
} from "@/lib/api/subscriptionApi";
import { Loader } from "@/components/Loader";

import AssignPopupSubscription from "@/components/AssignPopupSubscription";
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
  startDate: string;
  status: string;
  totalPrice: string;
  product: Product; // Add this line to include the 'product' object
  deliveryuserId: null;
}

interface DeliveryPartner {
  id: number;
  username: string;
  address: string;
}

const SubscriptionAssign = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [subscriptionOrderId, setSubscriptionOrderId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Delivery Users
  const [deliveryPartner, setDeliveryPartner] = useState<DeliveryPartner[]>([]);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit.id;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUnassignedSubscription(
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

  // useEffect(() => {
  //   fetchUsers();
  // }, [fetchUsers]); // Add fetchUsers in the dependency array

  // Delivery partner
  const fetchDeliveryUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDeliveryUsers(
        hubuserId,
        productName,
        subscriptionOrderId,
        page.toString(),
        limit.toString()
      );
      setDeliveryPartner(data?.users || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, productName, subscriptionOrderId, page, limit]); // Dependencies listed here

  useEffect(() => {
    fetchUsers();
    fetchDeliveryUsers();
  }, [fetchUsers, fetchDeliveryUsers]); // Add fetchUsers in the dependency array

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
  console.log("deliveryPartner", deliveryPartner);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCheckoutId, setSelectedCheckoutId] = useState<number | null>(null);
  const [selectedAssignedId, setSelectedAssignedId] = useState<string | null>(null);
  const [selectedstartDate, setSelectedStartDate] = useState<string | null>(null);

  const handleOpenPopup = (checkoutId: number, assignedIds: string, startDate: string) => {
    setSelectedCheckoutId(checkoutId);
    setSelectedAssignedId(assignedIds);
    setSelectedStartDate(startDate);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCheckoutId(null);
  };
 
  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-between">
        <h5 className="font-[family-name:var(--interSemiBold)] flex items-center">
          Orders{" "}
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
          Assign
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
              placeholder="Order Id"
              value={subscriptionOrderId}
              onChange={(e) => setSubscriptionOrderId(e.target.value)}
              className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-[#FFA500] text-white rounded flex items-center px-2 py-1"
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
          <tr className="bg-[#FFA500] text-white">
            <th className="p-3">S.No</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Payment Status</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Assign Status</th>
            <th className="p-3">Action</th>
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
                className="cursor-pointer hover:bg-orange-100 border-y border-slate-200"
              >
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {subscription?.subscriptionOrderId}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {subscription?.product?.productName}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {subscription?.status}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {subscription?.totalPrice}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  {subscription?.deliveryuserId == null ? "Un Assigned" : "Assigned"}
                </td>
                <td className="p-2 font-[family-name:var(--interRegular)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    onClick={() => handleOpenPopup(subscription?.id, subscription?.subscriptionOrderId, subscription?.startDate)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mx-1 p-2 bg-[#FFA500] text-white rounded flex items-center"
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
          className="mx-1 p-2 bg-[#FFA500] text-white rounded flex items-center"
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

      {/* Popup */}
      <AssignPopupSubscription
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        subscriptionId={selectedCheckoutId!}
        assignedIds={selectedAssignedId!}
        startDate={selectedstartDate!}
        hubuserId={hubuserId}
        deliveryPartner={deliveryPartner}
      />
    </>
  );
};

export default SubscriptionAssign;
