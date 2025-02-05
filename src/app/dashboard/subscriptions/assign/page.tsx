"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getUnassignedSubscription,
  getAllDeliveryUsersHubDropdown,
  assignDeliveryPartner,
  assignDeliveryOrders,
} from "@/lib/api/subscriptionApi";
import { Loader } from "@/components/Loader";
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
  startDate: string;
  status: string;
  totalPrice: string;
  productId: number;
  quantity: string;
  product: Product;
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
  const [deliveryPartner, setDeliveryPartner] = useState<DeliveryPartner[]>([]);

  const hubuserId = useSelector(
    (state: RootState) => state.auth.existingUser.id
  );

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
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, productName, subscriptionOrderId, page, limit]);

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
    fetchUsers();
    fetchDeliveryUsers();
  }, [fetchUsers, fetchDeliveryUsers]);

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

  // Popup State Management
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSubscriptionId, setSelectedSubscriptionId] =
    useState<number | null>(null);
    const [selectedDeliveryOrderId, setSelectedDeliveryOrderId] = useState<number | null>(
      null
    );
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [popupError, setPopupError] = useState<string | null>(null);
  const [popupLoading, setPopupLoading] = useState(false);
  // const [assignLoading, setAssignLoading] = useState(false);

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

    // Find the matching order using selectedAssignedId
    // const matchedOrder = subscriptions.find(
    //   (subscription) =>
    //     subscription.subscriptionOrderId === selectedSubscription.subscriptionOrderId
    // );

    // if (!matchedOrder) {
    //   setPopupError("Order details not found. Please try again.");
    //   return;
    // }

    setPopupLoading(true);
    setPopupError(null);

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    try {
      await assignDeliveryPartner(
        hubuserId,
        selectedSubscriptionId!.toString(),
        selectedDeliveryOrderId!.toString(),
        selectedUser.toString()
      );

      // Then, assign the delivery order
      // await assignDeliveryOrders(
      //   today, // Today's date
      //   false, // isDelivered
      //   "", // Description
      //   selectedSubscription.subscriptionOrderId, // Assigned order ID
      //   selectedUser.toString(), // Delivery user ID
      //   "Subscription",
      //   matchedOrder.productId, // Product ID
      //   matchedOrder.quantity,
      //   hubuserId // Quantity (parsed from stockQty)
      // );

      // alert("Subscription assigned successfully!");
      toast.success("Subscription assigned successfully!");
      handleClosePopup();
      fetchUsers();
    } catch (err) {
      console.error("Failed to assign subscription", err);
      setPopupError("Failed to assign subscription. Please try again.");
    } finally {
      setPopupLoading(false);
    }
  };

  return (
    <>
      {/* Search Section */}
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
          Assign
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
              placeholder="Order Id"
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

      <table className="table-auto w-full border bg-white rounded-xl">
        <thead className="text-left font-semibold">
          <tr className="bg-green-950 text-white font-[family-name:var(--interSemiBold)]">
            <th className="py-3 px-2">S.No</th>
            <th className="py-3 px-2">Order ID</th>
            <th className="py-3 px-2">Product Name</th>
            <th className="py-3 px-2">Payment Status</th>
            <th className="py-3 px-2">Total Price</th>
            <th className="py-3 px-2">Assign Status</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center p-4">
                <Loader />
              </td>
            </tr>
          ) : subscriptions.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No Subscription found.
              </td>
            </tr>
          ) : (
            subscriptions.map((subscription, index) => (
              <tr
                key={subscription.id}
                className="hover:bg-green-100 cursor-pointer border-y font-[family-name:var(--interRegular)]"
              >
                <td className="py-3 px-2">{index + 1 + (page - 1) * limit}</td>
                <td className="py-3 px-2">
                  {subscription.subscriptionOrderId}
                </td>
                <td className="py-3 px-2">
                  {subscription.product.productName}
                </td>
                <td className="py-3 px-2">{subscription.status}</td>
                <td className="py-3 px-2">{subscription.totalPrice}</td>
                <td className="py-3 px-2">
                  {subscription.deliveryuserId == null
                    ? "Unassigned"
                    : "Assigned"}
                </td>
                <td className="py-3 px-2">
                  {/* <button
                    onClick={() => handleOpenPopup(subscription)}
                    className="text-blue-600 underline"
                  >
                    Assign
                  </button> */}
                  <button onClick={() => handleOpenPopup(subscription.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      // onClick={() => handleOpenPopup(subscription?.id, subscription?.subscriptionOrderId, subscription?.startDate)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
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
          className="bg-amber-900 text-white px-4 py-2 rounded mx-1"
        >
          Prev
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-amber-900 text-white px-4 py-2 rounded mx-1"
        >
          Next
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
              {deliveryPartner.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username} - {user.address}
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
export default SubscriptionAssign;
