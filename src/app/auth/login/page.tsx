// "use client";
// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { loginUser, validateOTP } from "@/lib/api/authApi";
// import { setAuth } from "@/redux/slices/authSlice";
// import { toast } from "react-toastify";

// const Home = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOTP] = useState("");

//   const [validation, setValidation] = useState("");
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleOTPSend = async () => {
//     try {
//       // Check for empty fields
//       if (!phone.trim()) {
//         setValidation("Please enter an phone number");
//         return; // Exit function if validation fails
//       };

//       // Clear validation messages
//       setValidation("");

//       // Call API and handle response
//       const { message } = await loginUser(phone);
   
//       toast.success(message);

//     } catch (error) {
//       console.log(error);
//       toast.error("OTP not sended. Please try again.");
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       // Check for empty fields
//       if (!otp.trim()) {
//         setValidation("Please enter an OTP");
//         return; // Exit function if validation fails
//       }

//       // Clear validation messages
//       setValidation("");

//       // Call API and handle response
//       const { token, existingUser, message } = await validateOTP(otp, phone);
//       console.log(
//         "token",
//         token,
//         "existingUser",
//         existingUser,
//         "message",
//         message
//       );

//       dispatch(setAuth({ token, existingUser })); // Save token and user to Redux
//       // setResMessage(message); // Set success message
//       toast.success(message);
//       router.push("/dashboard");
//     } catch (error) {
//       console.log(error);
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   return (
//     <main className="min-h-screen ">
//       <div className="bg-[url('../../public/assets/shutterstock_322888487-2-ql73b798b4ngnw8w8b3ygew6351qvtpdzdwjcka3qc.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
//         <div className="bg-white/80 p-8 rounded-lg shadow-lg w-3/12">
//           <h1 className="text-2xl font-bold mb-4 font-[family-name:var(--interSemiBold)]">
//             Login
//           </h1>
//           <div className="sm:col-span-8">
//             <label
//               htmlFor="phone"
//               className="block text-sm/6 font-medium text-gray-900 font-[family-name:var(--interRegular)]"
//             >
//               Phone Number
//             </label>
//             <div className="mt-2">
//               <input
//                 id="phone"
//                 name="phone"
//                 type="number"
//                 value={phone}
//                 autoComplete="phone"
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//               />
//             </div>
//           </div>
//           {/*Button  */}
//           <div className="mt-6 flex items-center justify-center gap-x-6">
//             <button
//               type="submit"
//               onClick={handleOTPSend}
//               className="w-full font-[family-name:var(--interSemiBold)] rounded-md bg-green-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Login
//             </button>
//           </div>
//           <p className="mt-1.5 text-sm/6 text-pink-600 font-[family-name:var(--interMedium)]">
//             {validation}
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Home;
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginUser, validateOTP } from "@/lib/api/authApi";
import { setAuth } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [validation, setValidation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState(5);

  const router = useRouter();
  const dispatch = useDispatch();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null)); // Store OTP input refs

  // Handle OTP timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showModal && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showModal, timer]);

  // Send OTP function
  const handleOTPSend = async () => {
    try {
      if (!phone.trim()) {
        setValidation("Please enter a phone number");
        return;
      }
      setValidation("");

      // Call API to send OTP
      const { message } = await loginUser(phone);
      toast.success(message);

      // Store phone number in LocalStorage (hidden from UI)
      localStorage.setItem("userPhone", phone);

      // Open modal for OTP input
      setShowModal(true);
      setTimer(5); // Reset timer

      // Focus first OTP box after modal opens
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (error) {
      console.log(error);
      toast.error("OTP not sent. Please try again.");
    }
  };

  // Handle OTP input
  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Submit OTP function
  const handleLogin = async () => {
    try {
      const userPhone = localStorage.getItem("userPhone");
      if (!userPhone) {
        toast.error("Session expired, please try again.");
        setShowModal(false);
        return;
      }

      const enteredOTP = otp.join(""); // Join OTP digits
      if (enteredOTP.length !== 6) {
        setValidation("Please enter a valid 6-digit OTP");
        return;
      }

      setValidation("");

      // Call API to validate OTP
      const { token, existingUser, message } = await validateOTP(enteredOTP, userPhone);
      dispatch(setAuth({ token, existingUser }));

      toast.success(message);

      // Clear LocalStorage and redirect
      localStorage.removeItem("userPhone");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/shutterstock_322888487-2-ql73b798b4ngnw8w8b3ygew6351qvtpdzdwjcka3qc.jpg')" }}>
      
      <div className="bg-white/80 p-8 rounded-lg shadow-lg w-3/12">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {/* Phone Input */}
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone Number</label>
        <input
          id="phone"
          type="number"
          value={phone}
          autoComplete="phone"
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
        />

        {/* Login Button */}
        <button onClick={handleOTPSend}
          className="mt-6 w-full bg-green-950 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
          Login
        </button>

        <p className="mt-1.5 text-sm text-pink-600">{validation}</p>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
            
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 mb-4">
  {otp.map((digit, index) => (
    <input
      key={index}
      id={`otp-${index}`}
      ref={(el) => {
        inputRefs.current[index] = el; // Store ref properly
      }}
      type="text"
      maxLength={1 as number}
      value={digit}
      onChange={(e) => handleOTPChange(index, e.target.value)}
      className="w-10 h-10 text-center text-xl border border-gray-300 rounded"
    />
  ))}
</div>


            {/* Timer */}
            <p className="text-sm text-gray-600">Resend OTP in {timer}s</p>

            {/* Submit Button */}
            <button onClick={handleLogin}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
