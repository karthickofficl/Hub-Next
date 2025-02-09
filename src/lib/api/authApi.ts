import axios  from "axios";

// Login API Handler
export const validateOTP = async(otp: string, phone: string) =>{
    console.log("otp, phone", otp, phone);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otpValidated`, {otp, phone, roleId: "4"}, {headers: {"Content-Type": "application/json"}});
    // console.log("response",response);
    return response.data;
};

export const loginUser = async(phone: string) =>{
    console.log("email", phone);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {phone, roleId: "4"}, {headers: {"Content-Type": "application/json"}});
    // console.log("response",response);
    return response.data;
};