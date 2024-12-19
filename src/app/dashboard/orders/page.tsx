"use client";
import React, { useState, useEffect } from "react";
import { getOrders } from "@/lib/api/ordersAPI";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

interface Order {
  id: number;
  deliveryDay: string;
  assignedIds: string;
}
const OrdersListing = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        console.log("data", data);
        
        setOrders(data?.orders); // Assuming data is an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("orders", orders);
  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!orders.length) {
    return <p>No orders found.</p>;
  }
  return (
    <table className="table-fixed w-full border-spacing-2 p-4">
      <thead className="text-left font-[family-name:var(--interSemiBold)]  ">
        <tr className="bg-orange-300 rounded ">
          <th className="p-3 font-[family-name:var(--interRegular)]">
            Order ID
          </th>
          <th className="p-3 font-[family-name:var(--interRegular)]">
            Product name
          </th>
          <th className="p-3 font-[family-name:var(--interRegular)]">
            Customer name
          </th>
          <th className="p-3 font-[family-name:var(--interRegular)]">Price</th>
          <th className="p-3 font-[family-name:var(--interRegular)]">Qty</th>
          <th className="p-3 font-[family-name:var(--interRegular)]">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 font-[family-name:var(--interRegular)]">
            #AGARAM845355
          </td>
          <td className="p-2 font-[family-name:var(--interRegular)]">Milk</td>
          <td className="p-2 font-[family-name:var(--interRegular)]">Jack</td>
          <td className="p-2 font-[family-name:var(--interRegular)]">1961</td>
          <td className="p-2 font-[family-name:var(--interRegular)]">1961</td>
          <td className="p-2 font-[family-name:var(--interRegular)]">
            Completed
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrdersListing;
