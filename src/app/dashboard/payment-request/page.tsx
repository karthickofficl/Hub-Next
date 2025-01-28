"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getAllSalaryRequest, getSingleSalary } from "@/lib/api/salaryRequestApi";
import { Loader } from "@/components/Loader";

interface Salary {
  id: number;
  attenanceFees: string;
  salary: string;
  petrolAllowance: string;
  totalSalary: string;
  deliveryuserId: number;
  driverID: string;
  month: string;
  isCompleted: boolean;
  year: string;
}
const PaymentRequest = () => {
  const [salary, setSalary] = useState<Salary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [driverID, setDriverID] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<Salary | null>(null); // For offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit?.id;

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllSalaryRequest(
        hubuserId,
        driverID,
        month,
        page.toString(),
        limit.toString()
      );
      setSalary(data?.salary || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, driverID, month, page, limit]);

  const fetchSingleSalary = async (id: number) => {
    try {
      setLoading(true);
      const salary = await getSingleSalary(id);
      setSelectedUser(salary);
      setIsOffcanvasOpen(true); // Open the offcanvas
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRefresh = () => {
    setDriverID("");
    setMonth("");
    setPage(1);
    fetchRequests();
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedUser(null);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-end">
        <div className="items-center grid grid-cols-5 gap-3 sm:grid-cols-5 lg:grid-cols-5">
          <div>
            <h5 className="font-[family-name:var(--interSemiBold)]">
              Delivery Payment
            </h5>
          </div>
          <div className="w-full">
            <input
              type="search"
              placeholder="Delivery User ID"
              value={driverID}
              onChange={(e) => setDriverID(e.target.value)}
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="w-full">
            <input
              type="email"
              placeholder="Name"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="w-full">
            <button
              type="button"
              onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-amber-900 text-white rounded flex items-center px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 pr-2"
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
          <div className="w-full">
            <button
              type="button"
              //   onClick={handleRefresh}
              className="font-[family-name:var(--interRegular)] bg-amber-900 text-white rounded flex items-center px-2 py-1"
            >
              <svg
                onClick={() => handleOpenPopup()}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 pr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Add Payment Request
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto w-full border-spacing-2 p-4 border bg-white rounded-xl">
        <thead className="text-left font-semibold">
          <tr className="bg-green-950 text-white rounded-xl border font-[family-name:var(--interSemiBold)]">
            <th className="py-3 px-2">S.No</th>
            <th className="py-3 px-2">Driver ID</th>
            <th className="py-3 px-2">Attenance Fees</th>
            <th className="py-3 px-2">Salary</th>
            <th className="py-3 px-2">Petrol Allowance</th>
            <th className="py-3 px-2">Month</th>
            <th className="py-3 px-2">Year</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                <Loader />
              </td>
            </tr>
          ) : salary.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            salary.map((requestsalary, index) => (
              <tr
                key={requestsalary.id}
                className="hover:bg-green-100 cursor-pointer border-y"
              >
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.driverID}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.attenanceFees}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.salary}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.petrolAllowance}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.month}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.year}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {requestsalary.isCompleted}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  <svg
                    onClick={() => fetchSingleSalary(requestsalary.id)}

                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="mx-1 p-2 bg-amber-900 cursor-pointer text-white rounded flex items-center font-[family-name:var(--interSemiBold)]"
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
          className="mx-1 cursor-pointer p-2 bg-amber-900 text-white rounded flex items-center font-[family-name:var(--interSemiBold)]"
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

      {/* Offcanvas for User Details */}
      {isOffcanvasOpen && selectedUser && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 overflow-auto">
          <div className="p-4">
            <div className="flex items-center justify-between bg-green-950 px-3 py-2">
              <h3 className="text-white font-bold text-lg  font-[family-name:var(--interSemiBold)]">
                Salary Details
              </h3>
              <button
                onClick={handleCloseOffcanvas}
                className="text-red-600 text-lg  font-[family-name:var(--interSemiBold)]"
              >
                Close
              </button>
            </div>
            <div className="mt-3">
              <p className="font-[family-name:var(--interRegular)]">
                <strong>driverID:</strong> {selectedUser.driverID}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Attenance Fees:</strong> {selectedUser.attenanceFees}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Salary:</strong> {selectedUser.salary}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Petrol Allowance:</strong> {selectedUser.petrolAllowance}
              </p>

              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Total:</strong> {selectedUser.totalSalary}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Month:</strong> {selectedUser.month}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Year:</strong> {selectedUser.year}
              </p>
            </div>
          </div>
        </div>
      )};

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 font-[family-name:var(--interSemiBold)]">
              Assign Delivery Partner
            </h2>
            <select className="block w-full p-2 border rounded-md mb-4 font-[family-name:var(--interRegular)]">
              <option value="">Select Delivery User</option>
              <option value="">Select Delivery User</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button className="bg-red-600 text-white rounded px-4 py-2">
                Cancel
              </button>
              <button className="bg-green-950 text-white rounded px-4 py-2">Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentRequest;
