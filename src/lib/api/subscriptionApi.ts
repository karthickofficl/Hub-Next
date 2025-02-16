import axios from "axios";
// Orders API Handler
export const getSubscriptions = async (
  hubuserId: string,
  productName: string,
  subscriptionOrderId: string,
  page: string,
  limit: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage?.getItem("token");
    console.log("token", token);

    const response = await axios?.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription/getAllHubSubscription?hubuserId=${hubuserId}&productName=${productName}&subscriptionOrderId=${subscriptionOrderId}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const getUnassignedSubscription = async (
  hubuserId: string,
  productName: string,
  subscriptionOrderId: string,
  page: string,
  limit: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription/getAllHubUnassignedSubscription?hubuserId=${hubuserId}&productName=${productName}&subscriptionOrderId=${subscriptionOrderId}&page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("subscription response", response.data);
    return response.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const getAllDeliveryUsersHubDropdown = async (hubuserId: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/user/getAllDeliveryUsersHub?hubuserId=${hubuserId}`,
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

export const assignDeliveryPartner = async (
  hubuserId: string,
  subscriptionId: string,
  deliveryOrderId: string,
  deliveryuserId: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/assign/assignSubscriptionHubToDeliveryPartner`,
      { hubuserId, subscriptionId, deliveryOrderId, deliveryuserId },
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

// single data get
export const getSubscriptionSingleHistory = async (id: number) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscription/getSubscriptionSingleHistory/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("single data", response.data);

    return response.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const hubChangeDeliveryStatus = async (
  statusId: number,
  newStatus: string,
  subscriptionId: number,
  userId: number,
  vacationDate: string,
  singleProductPrice: string
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vacation/vacationCreate`,
      {
        statusId,
        deliveryStatus: newStatus,
        subscriptionId,
        userId,
        vacationDate,
        singleProductPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // Return the response data to the calling function.
  } catch (error: any) {
    console.error(
      "Error in hubChangeDeliveryStatus API:",
      error.response || error.message || error
    );
    throw error; // Rethrow the error for the calling function to handle.
  }
};

export const assignDeliveryOrders = async (
  deliveryDay: string,
  isDelivered: boolean,
  description: string,
  assignedIds: string,
  deliveryuserId: string,
  flag: string,
  productId: number,
  quantity: string,
  hubuserId: number
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/delivery/order/productAssignToDelivery`,
      {
        deliveryDay,
        isDelivered,
        description,
        assignedIds,
        deliveryuserId,
        flag,
        productId,
        quantity,
        hubuserId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in assignDeliveryOrders:", error);
    throw error;
  }
};

export const ReassignDeliveryPartner = async (
  hubuserId: string,
  subscriptionId: string,
  deliveryOrderId: string,
  deliveryuserId: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/assign/assignSubscriptionHubToDeliveryPartnerReassign`,
      { hubuserId, subscriptionId, deliveryOrderId, deliveryuserId },
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