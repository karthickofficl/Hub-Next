import axios from "axios";
// Orders API Handler
export const allDeliveryProductsCountHub = async (
  hubuserId: string,
  deliveryDay: any
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/order/allDeliveryProductsCountHub?hubuserId=${hubuserId}&deliveryDay=${deliveryDay}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("users count", response.data);

    return response.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};
