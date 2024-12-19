import axios  from "axios";

// Login API Handler
export const loginUser = async(email: string, password: string) =>{
    console.log("email, password", email, password);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {email, password, roleId: "4"}, {headers: {"Content-Type": "application/json"}});
    // console.log("response",response);
    return response.data;
};