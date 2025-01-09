import axios from "axios";
// Orders API Handler
export const getCheckout = async (hubuserId: string, productName: string, orderId: string, page: string, limit: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout/getAllHubCheckouts?hubuserId=${hubuserId}&productName=${productName}&orderId=${orderId}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("checkout response", response.data);
    return response.data; // Ensure this returns an array of users 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const getUnassignedCheckout = async (hubuserId: string, productName: string, orderId: string, page: string, limit: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout/getAllHubUnassignedCheckouts?hubuserId=${hubuserId}&productName=${productName}&orderId=${orderId}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("checkout response", response.data);
    return response.data; // Ensure this returns an array of users 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const getDeliveryUsers = async (hubuserId: string, username: string, email: string, page: string, limit: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/user/getAllDeliveryUsersHub?hubuserId=${hubuserId}&username=${username}&email=${email}&page=${page}&limit=${limit}`,
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

export const assignDeliveryPartner = async (hubuserId: string, checkOutId: string, deliveryuserId: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/assign/assignCheckoutHubToDeliveryPartner`,
      {hubuserId, checkOutId, deliveryuserId},
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