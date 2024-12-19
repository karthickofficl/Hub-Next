"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "../../public/assets/Capture.png";
export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Tracks which dropdown is open

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
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
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
          />
        </svg>
      ), // No dropdown for Dashboard
      subMenu: null,
    },
    {
      name: "Orders",
      icon: (
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
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
      ),
      subMenu: [{ name: "Orders List", path: "/dashboard/orders" }],
    },
    {
      name: "Delivery",
      icon: (
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
      subMenu: [{ name: "Delivery List", path: "/dashboard/delivery" }],
    },
    {
      name: "Attendance",
      icon: (
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
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      subMenu: [
        { name: "Delivery Attendence", path: "/dashboard/delivery-attendance" },
        { name: "Manager Attendence", path: "/dashboard/delivery-manager" },
      ],
    },
    // {
    //   name: "Assigning",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="size-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
    //       />
    //     </svg>
    //   ),
    //   subMenu: [
    //     { name: "Assigning List", path: "/dashboard/assigning" },
    //     {
    //       name: "Assigning create",
    //       path: "/dashboard/assigning/creatre-assigning",
    //     },
    //   ],
    // },
    // {
    //   name: "Assigning",
    //   path: "/dashboard/assigning",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="size-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
    //       />
    //     </svg>
    //   ), // No dropdown for Dashboard
    //   subMenu: null,
    // },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col min-h-screen">
      {/* Logo */}
      {/* <div className="p-4 text-2xl font-bold text-blue-500 border-b">
        Admin Panel
      </div> */}
      <div className="text-center flex justify-center border-b">
        <Image src={logo} width={100} height={100} alt="logo" />
      </div>
      {/* Menu Items */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <div key={item.name} className="mb-2">
            {/* Top-level Menu */}
            {item.subMenu ? (
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.name ? null : item.name)
                }
                className="flex items-center justify-between w-full text-left p-3 rounded-md hover:bg-gray-200"
              >
                <div className="flex items-center">
                  {item.icon && (
                    <span className="text-xl mr-3">{item.icon}</span>
                  )}
                  {item.name}
                </div>
                {openDropdown === item.name ? (
                  // <FiChevronUp className="text-gray-500" />
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  // <FiChevronDown className="text-gray-500" />

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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = item.path!)}
                className="flex items-center p-3 w-full text-left rounded-md hover:bg-gray-200"
              >
                {item.icon && <span className="text-xl mr-3">{item.icon}</span>}
                {item.name}
              </button>
            )}

            {/* Dropdown Submenu */}
            {item.subMenu && openDropdown === item.name && (
              <div className="ml-6 mt-2 space-y-2">
                {item.subMenu.map((subItem) => (
                  <button
                    key={subItem.name}
                    onClick={() => (window.location.href = subItem.path)}
                    className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-200"
                  >
                    {subItem.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
