"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getSubscriptions,
  getAllDeliveryUsersHubDropdown,
  ReassignDeliveryPartner
} from "@/lib/api/subscriptionApi";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

interface DeliveryPartner {
  id: number;
  username: string;
  address: string;
}

const OrdersHistory = () => {
  const [subscription, setSubscription] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [subscriptionOrderId, setSubscriptionOrderId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Popup State Management
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    number | null
  >(null);
  const [selectedDeliveryOrderId, setSelectedDeliveryOrderId] = useState<
    number | null
  >(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [popupError, setPopupError] = useState<string | null>(null);
  const [popupLoading, setPopupLoading] = useState(false);
  const [deliveryPartner, setDeliveryPartner] = useState<DeliveryPartner[]>([]);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit?.id;

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSubscriptions(
        hubuserId,
        productName,
        subscriptionOrderId,
        page.toString(),
        limit.toString()
      );
      setSubscription(data?.subscriptions || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, productName, subscriptionOrderId, page, limit]); // Dependencies listed here

  const fetchDeliveryUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllDeliveryUsersHubDropdown(hubuserId);
      setDeliveryPartner(data?.users || []);
    } catch (error) {
      console.error("Error fetching delivery users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId]);

  useEffect(() => {
    fetchSubscriptions();
    fetchDeliveryUsers();
  }, [fetchSubscriptions, fetchDeliveryUsers]); // Add fetchUsers in the dependency array

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRefresh = () => {
    setProductName("");
    setSubscriptionOrderId("");
    setPage(1);
    fetchSubscriptions();
  };

  console.log("subscription", subscription);

  // Navigation
  const router = useRouter();
  const handleViewSubscription = (id: number) => {
    router.push(`/dashboard/subscriptions/view/${id}`); // Navigate to the order details page
  };

  const handleOpenPopup = (subscriptionId: number) => {
    setSelectedSubscriptionId(subscriptionId);
    setSelectedDeliveryOrderId(subscriptionId);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSubscriptionId(null);
    setSelectedDeliveryOrderId(null);
    setSelectedUser(null);
    setPopupError(null);
  };

  const handleAssign = async () => {
    if (!selectedUser) {
      setPopupError("Please select a delivery user.");
      return;
    }
    setPopupLoading(true);
    setPopupError(null);
    try {
      await ReassignDeliveryPartner(
        hubuserId,
        selectedSubscriptionId!.toString(),
        selectedDeliveryOrderId!.toString(),
        selectedUser.toString()
      );
      toast.success("Subscription assigned successfully!");
      handleClosePopup();
      fetchSubscriptions();
    } catch (err) {
      console.error("Failed to assign subscription", err);
      setPopupError("Failed to assign subscription. Please try again.");
    } finally {
      setPopupLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-between">
        <h5 className="font-[family-name:var(--interSemiBold)] flex items-center">
          Subscription{" "}
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
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="search"
              placeholder="Subscription Id"
              value={subscriptionOrderId}
              onChange={(e) => setSubscriptionOrderId(e.target.value)}
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-amber-900 text-white rounded flex items-center px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 pr-2"
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

      <table className="table-auto w-full border-spacing-2 p-4 border bg-white rounded-xl">
        <thead className="text-left font-semibold">
          <tr className="bg-green-950 text-white rounded-xl border font-[family-name:var(--interSemiBold)]">
            <th className="py-3 px-2">S.No</th>
            <th className="py-3 px-2">Order ID</th>
            <th className="py-3 px-2">Product Name</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Total Price</th>
            <th className="py-3 px-2">Action</th>
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
          ) : subscription.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            subscription.map((subscription, index) => (
              <tr
                key={subscription.id}
                className="hover:bg-green-100 cursor-pointer border-y border-slate-200"
              >
                <td className="font-[family-name:var(--interRegular)]  py-3 px-2">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="font-[family-name:var(--interRegular)]  py-3 px-2">
                  {subscription?.subscriptionOrderId}
                </td>
                <td className="font-[family-name:var(--interRegular)]  py-3 px-2">
                  {subscription?.product?.productName}
                </td>
                <td className="font-[family-name:var(--interRegular)]  py-3 px-2">
                  {subscription?.status}
                </td>
                <td className="font-[family-name:var(--interRegular)]  py-3 px-2">
                  {subscription?.totalPrice}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  <span className="flex gap-1.5">
                    <svg
                      onClick={() => handleViewSubscription(subscription?.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>{" "}
                    <svg
                      onClick={() => handleOpenPopup(subscription?.id)}
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </span>
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
          className="mx-1 p-2 bg-amber-900 cursor-pointer text-white rounded flex items-center font-[family-name:var(--interSemiBold)]"
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
          className="mx-1 cursor-pointer p-2 bg-amber-900 text-white rounded flex items-center font-[family-name:var(--interSemiBold)]"
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
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 font-[family-name:var(--interSemiBold)]">
              Assign Delivery Partner
            </h2>
            {popupError && <p className="text-red-500 mb-4">{popupError}</p>}
            <select
              value={selectedUser || ""}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              className="block w-full p-2 border rounded-md mb-4 font-[family-name:var(--interRegular)]"
            >
              <option value="">Select Delivery User</option>
              {deliveryPartner?.map((user) => (
                <option key={user?.id} value={user?.id}>
                  {user?.username} - {user?.address}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="bg-red-600 text-white rounded px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="bg-green-950 text-white rounded px-4 py-2"
              >
                {popupLoading ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
