"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSingleCheckout } from "@/lib/api/ordersAPI";
import { Loader } from "@/components/Loader";
// import axios from "axios";
import Image from "next/image";

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

interface Checkout {
  id: number;
  paymentId: string;
  totalPrice: string;
  paymentStatus: string;
  paymentType: string;
  quantity: string;
  preference: string;
  orderId: string;
  user: User;
  products: Product[]; // <-- Update this from 'product' to 'products'
}

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  price: string;
  stockQty: string;
  productImages: string;
  checkoutproduct: {
    qquantity: number;
  };
}


const OrderDetailsPage = () => {
  const { id } = useParams(); // Extract the `id` parameter from the URL
  const [checkout, setCheckout] = useState<Checkout | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckout = async (checkoutId: number) => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const data = await getSingleCheckout(checkoutId);
      if (data && data.checkout) {
        setCheckout(data.checkout); // Populate the checkout state
      } else {
        setError("Checkout details not found.");
      }
    } catch (error) {
      console.error("Error fetching checkout details:", error);
      setError("Failed to fetch checkout details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchCheckout(Number(id));
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!checkout) {
    return <p>Checkout details not found.</p>;
  }

  const { user } = checkout;

  return (
    <div className="p-4">
      <h2 className="text-green-700 font-[family-name:var(--interSemiBold)] font-bold text-xl mb-4">
        Order Details
      </h2>

      {/* Checkout Details */}
      <div className="bg-white rounded-lg p-5 shadow mb-5">
        <h3 className="font-bold text-lg text-green-700 mb-3">
          Checkout Details
        </h3>
        <div className="grid grid-cols-2 gap-4 ">
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Order ID:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {checkout.orderId}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Payment ID:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {checkout.paymentId}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Payment Type:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {checkout.paymentType}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Total Amount:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              ₹{checkout.totalPrice}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Delivery Preference:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {checkout.preference}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Payment Status:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {checkout.paymentStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-lg p-5 shadow mb-5">
        <h3 className="font-bold text-lg text-green-700 mb-3">
          Delivery Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Customer Name:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user?.username}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Mobile No:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user?.phone}
            </span>
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Address:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user?.address}, {user?.city}, {user?.state},{" "}
            </span>
            {user.pincode}
          </p>
          <p>
            <strong className="font-[family-name:var(--interSemiBold)]">
              Email:
            </strong>{" "}
            <span className="font-[family-name:var(--interRegular)]">
              {user?.email}
            </span>
          </p>
        </div>
      </div>

      {/* Product Details */}
      {/* Product Details */}
      <div className="bg-white rounded-lg p-5 shadow">
        <h3 className="font-bold text-lg text-green-700 mb-3">
          Product Details
        </h3>
        {checkout.products?.map((product) => (
          <div key={product?.id} className="mb-6 border-b pb-4 last:border-b-0">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong className="font-[family-name:var(--interSemiBold)]">
                  Product Name:
                </strong>{" "}
                <span className="font-[family-name:var(--interRegular)]">
                  {product?.productName}
                </span>
              </p>
              <p>
                <strong className="font-[family-name:var(--interSemiBold)]">
                  Price:
                </strong>{" "}
                <span className="font-[family-name:var(--interRegular)]">
                  ₹{product?.price}
                </span>
              </p>
              <p>
                <strong className="font-[family-name:var(--interSemiBold)]">
                  Quantity:
                </strong>{" "}
                <span className="font-[family-name:var(--interRegular)]">
                  {product?.checkoutproduct.qquantity}
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
                src={product?.productImages}
                alt={product?.productName}
                className="w-40 h-40 max-w-sm rounded shadow"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
