import axios from "axios";

export const getAllReports = async (
  hubuserId: number,
  productName: string,
  page: string,
  limit: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/report/getAllReport?hubuserId=${hubuserId}&productName=${productName}&page=${page}&limit=${limit}`,
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

export const getSingleReport = async (id: number) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/report/getSingleReport/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Single user data", response?.data?.existingReport);
    return response?.data?.existingReport; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const getProductNames = async () => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getProductNames`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Single user data", response?.data);
    return response?.data; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const postReport = async (reportData: {  
    hubuserId: number;  
    quantity: number;  
    status: string;  
    productId: number;  
  }) => {  
    try {  
      // Access localStorage within the function to ensure it's client-side  
      const token = localStorage.getItem("token");  
      console.log("token", token);  
  
      const response = await axios.post(  
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/report/addReport`,  
        reportData, // ✅ Send the entire object  
        {  
          headers: {  
            "Content-Type": "application/json",  
            Authorization: `Bearer ${token}`,  
          },  
        }  
      );  
      console.log("created", response?.data?.createReport);  
      return response?.data?.createReport; // Ensure this returns an array of users  
    } catch (error) {  
      console.error("Error fetching users:", error);  
      throw error; // Rethrow for further handling  
    }  
  };
  
