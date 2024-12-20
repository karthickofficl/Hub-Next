import axios from "axios";

// Orders API Handler
export const getOrders = async () => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/order/getOrders`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Ensure this returns an array of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow for further handling
  }
};
