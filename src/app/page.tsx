"use client";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/authApi";
import { setAuth } from "@/redux/slices/authSlice";
// import { Alert } from "@/components/Alert";
import { toast } from 'react-toastify';

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [resMessage, setResMessage] = useState("");

  const [validation, setValidation] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      // Check for empty fields
      if (!email.trim()) {
        setValidation("Please enter an email id");
        return; // Exit function if validation fails
      }
      if (!password.trim()) {
        setValidation("Please enter a password");
        return; // Exit function if validation fails
      }

      // Clear validation messages
      setValidation("");

      // Call API and handle response
      const { token, existingUser, message } = await loginUser(email, password);
      console.log(
        "token",
        token,
        "existingUser",
        existingUser,
        "message",
        message
      );

      dispatch(setAuth({ token, existingUser })); // Save token and user to Redux
      // setResMessage(message); // Set success message
      toast.success(message);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
      // setResMessage( 
      //   "Login failed. Please try again."
      // ); // Set error message based on API response
    }
  };

  // const handleCloseAlert = () => {
  //   setResMessage("");
  // };

  return (
    <main className="min-h-screen ">
      {/* <Alert resMessage={resMessage} onClose={handleCloseAlert} /> */}
      <div className="bg-[url('../../public/assets/shutterstock_322888487-2-ql73b798b4ngnw8w8b3ygew6351qvtpdzdwjcka3qc.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-lg shadow-lg w-3/12">
          <h1 className="text-2xl font-bold mb-4 font-[family-name:var(--interSemiBold)]">
            Login
          </h1>
          {/* <form action="handleLogin" method="post"> */}
          <div className="sm:col-span-8">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={email}
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-8">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          {/*Button  */}
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full font-[family-name:var(--interSemiBold)] rounded-md bg-green-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
          {/* </form> */}
          {/* <p className="mt-1.5 text-sm/6 text-gray-600 font-[family-name:var(--interMedium)]">
            Dont have an account?{" "}
            <a href="/auth/register" className="text-blue-500">
              Register
            </a>{" "}
          </p> */}
          <p className="mt-1.5 text-sm/6 text-pink-600 font-[family-name:var(--interMedium)]">
            {validation}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
