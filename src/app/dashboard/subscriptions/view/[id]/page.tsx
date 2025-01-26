"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getSubscriptionSingleHistory,
  hubChangeDeliveryStatus,
} from "@/lib/api/subscriptionApi";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  price: string;
  stockQty: string;
  productImages: string;
}

interface DeliveryStatus {
  id: number;
  deliveryDate: string;
  deliveryStatus: string;
  notes: string;
  subscriptionIsValid: boolean;
}

interface SubscriptionHistory {
  id: number;
  subscriptionOrderId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  preference: string;
  status: string;
  totalDate: string;
  quantity: string;
  product: Product;
  user: User;
  deliverystatuses: DeliveryStatus[];
}

const SubscriptionDetailsPage = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [subscription, setSubscription] = useState<SubscriptionHistory | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async (subscriptionId: number) => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const data = await getSubscriptionSingleHistory(subscriptionId);
      if (data && data.subscriptionHistory) {
        setSubscription(data.subscriptionHistory); // Populate the subscription state
      } else {
        setError("Subscription details not found.");
      }
    } catch (error) {
      console.error("Error fetching subscription details:", error);
      setError("Failed to fetch subscription details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubscription(Number(id));
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!subscription) {
    return <p>Subscription details not found.</p>;
  }

  const { user, product, deliverystatuses } = subscription;

  const handleStatusChange = async (
    statusId: number,
    newStatus: string,
    subscriptionId: number,
    userId: number,
    vacationDate: string,
    singleProductPrice: string
  ) => {
    try {
      if (
        !statusId ||
        !subscriptionId ||
        !userId ||
        !vacationDate ||
        !newStatus
      ) {
        toast.error("Invalid input parameters. Please try again.");
        return;
      }

      const data = await hubChangeDeliveryStatus(
        statusId,
        newStatus,
        subscriptionId,
        userId,
        vacationDate,
        singleProductPrice
      );

      console.log("API Response:", data);
      toast.success("Delivery status updated successfully!");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      toast.error("Unable to update delivery status. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-green-700 font-[family-name:var(--interSemiBold)] font-bold text-xl mb-4">
        Subscription Details
      </h2>

      {/* Subscription Details */}
      <div className="bg-white rounded-lg p-5 shadow mb-5">
        <h3 className="font-bold text-lg text-green-700 mb-3">
          Subscription Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Subscription Order ID:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.subscriptionOrderId}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Start Date:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.startDate}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              End Date:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.endDate}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Total Amount:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              ₹{subscription.totalPrice}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Preference:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.preference}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Status:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.status}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Total Days:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.totalDate}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Quantity:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {subscription.quantity}
            </span>
          </p>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-lg p-5 shadow mb-5">
        <h3 className="font-bold text-lg text-green-700 font-[family-name:var(--interSemiBold)] mb-3">
          Delivery Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Customer Name:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user.username}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Mobile No:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user.phone}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Address:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user.address}, {user.city}, {user.state}, {user.pincode}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Email:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user.email}
            </span>
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg p-5 shadow mb-5">
        <h3 className="font-bold text-lg font-[family-name:var(--interSemiBold)] text-green-700 mb-3">
          Product Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Product Name:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {product.productName}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Price:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              ₹{product.price}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Quantity:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {product.stockQty}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Description:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {product.productDescription}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <img
            src={product.productImages}
            alt={product.productName}
            className="w-full max-w-sm rounded shadow"
          />
        </div>
      </div>

      {/* Delivery Status */}
      {/* <div className="bg-white rounded-lg p-5 shadow">
        <h3 className="font-bold text-lg text-green-700 mb-3">Delivery Status</h3>
        {deliverystatuses.length > 0 ? (
          <div className="space-y-4">
            {deliverystatuses.map((status) => (
              <div
                key={status.id}
                className="border rounded p-3 shadow-sm bg-gray-50"
              >
                <p>
                  <strong>Delivery Date:</strong> {status.deliveryDate}
                </p>
                <p>
                  <strong>Status:</strong> {status.deliveryStatus}
                </p>
                <p>
                  <strong>Notes:</strong> {status.notes}
                </p>
                <p>
                  <strong>Subscription Valid:</strong>{" "}
                  {status.subscriptionIsValid ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No delivery statuses available.</p>
        )}
      </div> */}
      <div className="bg-white rounded-lg p-5 shadow">
        <h3 className="font-bold text-lg font-[family-name:var(--interSemiBold)] text-green-700 mb-3">
          Delivery Status
        </h3>
        {deliverystatuses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverystatuses.map((status) => (
              <div
                key={status.id}
                className="border rounded p-3 shadow-sm bg-gray-50"
              >
                <p>
                  <strong className="font-[family-name:var(--interSemiBold)]">
                    Delivery Date:
                  </strong>{" "}
                  {status.deliveryDate}
                </p>
                <div className="flex gap-2 align-middle items-center mt-2">
                  <strong className="font-[family-name:var(--interSemiBold)] mb-0">
                    Status:
                  </strong>{" "}
                  <select
                    value={status.deliveryStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        status.id,
                        e.target.value,
                        subscription.id,
                        user.id,
                        status.deliveryDate,
                        product.price
                      )
                    }
                    className="font-[family-name:var(--interRegular)] border-2 border-green-900 bg-green-50 col-start-1 row-start-1 appearance-none rounded-md py-1 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="YET TO DELIVER">YET TO DELIVER</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
                <p>
                  <strong className="font-[family-name:var(--interSemiBold)]">
                    Notes:
                  </strong>{" "}
                  <span className="font-[family-name:var(--interRegular)]">
                    {status.notes}
                  </span>
                </p>
                {/* <p>
                  <strong className="font-[family-name:var(--interSemiBold)]">
                    Subscription Valid:
                  </strong>{" "}
                  <span className="font-[family-name:var(--interRegular)]">
                    {status.subscriptionIsValid ? "Yes" : "No"}
                  </span>
                </p> */}
              </div>
            ))}
          </div>
        ) : (
          <p>No delivery statuses available.</p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDetailsPage;
