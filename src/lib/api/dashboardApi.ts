import axios from "axios";
// Orders API Handler
export const getUsersCount = async (hubuserId: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/getUsersCountHub?hubuserId=${hubuserId}`,
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

export const getDeliveryUsersCount = async (hubuserId: string) => {
    try {
      // Access localStorage within the function to ensure it's client-side
      const token = localStorage.getItem("token");
      console.log("token", token);
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/getDeliveryUserCountHub?hubuserId=${hubuserId}`,
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

  export const getOrdersCount = async (hubuserId: string) => {
    try {
      // Access localStorage within the function to ensure it's client-side
      const token = localStorage.getItem("token");
      console.log("token", token);
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/getCheckoutCountHub?hubuserId=${hubuserId}`,
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

  export const getSubscriptionCount = async (hubuserId: string) => {
    try {
      // Access localStorage within the function to ensure it's client-side
      const token = localStorage.getItem("token");
      console.log("token", token);
  
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/getSubscriptionCountHub?hubuserId=${hubuserId}`,
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