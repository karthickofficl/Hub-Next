import axios from "axios";

export const getAllSalaryRequest = async (
  hubuserId: number,
  deliveryAutoID: string,
  month: string,
  page: string,
  limit: string
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/salary/getAllSingleSalary?hubuserId=${hubuserId}&driverID=${deliveryAutoID}&month=${month}&page=${page}&limit=${limit}`,
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

export const getSingleSalary = async (id: number) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/salary/getSingleSalary/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Single user data", response?.data?.existingSalaryRequest);
    return response?.data?.existingSalaryRequest; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};

export const postSalaryRequest = async (
  attenanceFees: number,
  salary: number,
  petrolAllowance: number,
  totalSalary: number,
  month: string,
  requestDate: string,
  deliveryuserId: any,
  deliveryAutoID: string,
  hubuserId: number,
) => {
  try {
    // Access localStorage within the function to ensure it's client-side
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/salary/addSalaryRequest`,
      {
        attenanceFees,
        salary,
        petrolAllowance,
        totalSalary,
        month,
        requestDate,
        deliveryuserId,
        deliveryAutoID,
        hubuserId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Single user data", response?.data?.existingSalaryRequest);
    return response?.data?.existingSalaryRequest; // Ensure this returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow for further handling
  }
};