// "use client";
// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { getUsers } from "@/lib/api/userApi";

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// const UsersList = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const [limit, setLimit] = useState<number>(10);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   const hubuserIdSplit = useSelector(
//     (state: RootState) => state.auth.existingUser
//   );
//   console.log("hubuserIdSplit", hubuserIdSplit);

//   const hubuserId = hubuserIdSplit.id;
//   // const hubuserId = "10";

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const data = await getUsers(
//         hubuserId,
//         username,
//         email,
//         page.toString(),
//         limit.toString()
//       );
//       console.log("data on fetchusers", data);

//       setUsers(data?.users || []);
//       setTotalPages(data?.pagination?.totalPages || 0);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page, limit]);

//   const handleSearch = () => {
//     setPage(1); // Reset to first page for new search
//     fetchUsers();
//   };

//   const handleRefresh = () => {
//     setUsername("");
//     setEmail("");
//     setPage(1);
//     fetchUsers();
//   };

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   console.log("log users data", users);

//   if (loading) {
//     return <p>Loading users...</p>;
//   }

//   if (!users.length) {
//     return <p>No users found.</p>;
//   }

//   return (
//     <>
//       <div>
//         <h5 className="font-[family-name:var(--interSemiBold)]">Users</h5>
//         <div className="my-3 items-center grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-12">
//           <div className="sm:col-span-3">
//             <div className="">
//               <input
//                 type="search"
//                 name="username"
//                 id="username"
//                 placeholder="Full name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             {" "}
//             <div className="">
//               <input
//                 type="search"
//                 name="email"
//                 id="email"
//                 placeholder="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
//               />
//             </div>
//           </div>
//           {/* Button */}
//           <div className="sm:col-span-1">
//             <button
//               type="button"
//               onClick={handleSearch}
//               className="font-[family-name:var(--interRegular)] bg-blue-500 text-white rounded flex px-2 py-1"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                 />
//               </svg>
//               Search
//             </button>
//           </div>
//           <div className="sm:col-span-1">
//             <button
//               type="button"
//               onClick={handleRefresh}
//               className="font-[family-name:var(--interRegular)] bg-red-700 text-white rounded flex items-center px-2 py-1"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
//                 />
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       <table className="table-auto w-full border-spacing-2 p-4 border">
//         <thead className="text-left font-semibold">
//           <tr className="bg-orange-400 text-white font-[family-name:var(--interRegular)]">
//             <th className="p-3 font-[family-name:var(--interRegular)]">S.No</th>
//             <th className="p-3 font-[family-name:var(--interRegular)]">Full Name</th>
//             <th className="p-3 font-[family-name:var(--interRegular)]">Email</th>
//             <th className="p-3 font-[family-name:var(--interRegular)]">Phone</th>
//             <th className="p-3 font-[family-name:var(--interRegular)]">Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr
//               key={user.id}
//               className="hover:bg-slate-200 border-y border-slate-200 font-[family-name:var(--interRegular)]"
//             >
//               <td className="p-2 font-[family-name:var(--interRegular)]">
//                 {index + 1 + (page - 1) * limit}
//               </td>
//               <td className="p-2 font-[family-name:var(--interRegular)]">
//                 {user.username}
//               </td>
//               <td className="p-2 font-[family-name:var(--interRegular)]">
//                 {user.email}
//               </td>
//               <td className="p-2 font-[family-name:var(--interRegular)]">
//                 {user.phone}
//               </td>
//               <td className="p-2 font-[family-name:var(--interRegular)] truncate">
//                 {user.address}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-center items-center mt-4 fixed right-0 left-0 bottom-5">
//         <button
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//           className="flex mx-1 p-2 bg-orange-500 text-white rounded font-[family-name:var(--interSemiBold)]"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
//             />
//           </svg>
//           Prev
//         </button>
//         <span className="mx-2 font-[family-name:var(--interRegular)]">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === totalPages}
//           className="flex mx-1 p-2 bg-orange-500 text-white rounded font-[family-name:var(--interSemiBold)]"
//         >
//           Next
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
//             />
//           </svg>
//         </button>
//       </div>
//     </>
//   );
// };

// export default UsersList;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUsers } from "@/lib/api/userApi";
import { Loader } from "@/components/Loader";

interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit.id;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers(
        hubuserId,
        username,
        email,
        page.toString(),
        limit.toString()
      );
      setUsers(data?.users || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, username, email, page, limit]); // Dependencies listed here

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // Add fetchUsers in the dependency array

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRefresh = () => {
    setUsername("");
    setEmail("");
    setPage(1);
    fetchUsers();
  };
  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-between">
        <h5 className="font-[family-name:var(--interSemiBold)]">Users</h5>
        <div className=" items-center grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-8">
          <div className="sm:col-span-3">
            <input
              type="search"
              placeholder="Full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-red-700 text-white rounded flex items-center px-2 py-1"
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto w-full border-spacing-2 p-4 border">
        <thead className="text-left font-semibold">
          <tr className="bg-orange-400 text-white">
            <th className="p-3">S.No</th>
            <th className="p-3">Full Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Address</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                {/* Loading users... */}
                <Loader />
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-slate-200 border-y border-slate-200"
              >
                <td className="p-2">{index + 1 + (page - 1) * limit}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2 truncate">{user.address}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mx-1 p-2 bg-orange-500 text-white rounded flex items-center"
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
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
          Prev
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="mx-1 p-2 bg-orange-500 text-white rounded flex items-center"
        >
          Next
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
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default UsersList;