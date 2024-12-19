"use client";
import React, { useState, useEffect } from "react";
import { getUsers } from "@/lib/api/deliveryUserApi";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
}
const DeliveryListing = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUsers();
        console.log("data", data);

        setUsers(data?.users); // Assuming data is an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("users", users);
  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!users.length) {
    return <p>No orders found.</p>;
  }
  return (
    <table className="table-fixed w-full border-spacing-2 p-4">
      <thead className="text-left font-[family-name:var(--interSemiBold)]  ">
        <tr className="bg-orange-300 rounded">
          <th className="p-3">User Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Address</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2 font-[family-name:var(--interRegular)]">
              {user.username}
            </td>
            <td className="p-2 font-[family-name:var(--interRegular)]">
              {user.email}
            </td>
            <td className="p-2 font-[family-name:var(--interRegular)]">
              {user.phone}
            </td>
            <td className="p-2 font-[family-name:var(--interRegular)]">
              {user.address}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeliveryListing;
