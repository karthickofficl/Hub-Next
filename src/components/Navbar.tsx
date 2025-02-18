"use client"; // Mark this file as a Client Component
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = () => {
    // localStorage.removeItem("token");
    dispatch(logout());
    // Redirect to the home page after logout
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold font-[family-name:var(--interSemiBold)]">
        Agaram Hub
      </h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-200 rounded-full" title="profile">
          {/* <FiUser className="text-xl"/> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          title="logout"
          onClick={handleLogOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
