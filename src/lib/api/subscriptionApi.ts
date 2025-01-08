import axios from "axios";
// Orders API Handler
export const getSubscriptions = async (hubuserId: string, productName: string, subscriptionOrderId: string, page: string, limit: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription/getAllHubSubscription?hubuserId=${hubuserId}&productName=${productName}&subscriptionOrderId=${subscriptionOrderId}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};
