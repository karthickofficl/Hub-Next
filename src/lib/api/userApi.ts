import axios from "axios";
// Orders API Handler
export const getUsers = async (hubuserId: string, username: string, email: string, page: string, limit: string) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getAllUsersHub?hubuserId=${hubuserId}&username=${username}&email=${email}&page=${page}&limit=${limit}`,
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

export const getSingleUsers = async (id: number) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getUser/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Single user data", response?.data?.existingUser);
    return response?.data?.existingUser; // Ensure this returns an array of users
    
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};