import axios from "axios";
const token = localStorage.getItem("token");

console.log("token", token);
// Orders API Handler
export const getUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/user/getUsers`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.data; // Ensure this returns an array of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow for further handling
  }
};
