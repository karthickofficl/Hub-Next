"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getAllReports,
  getSingleReport,
  getProductNames,
  postReport,
} from "@/lib/api/reportApi";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";

interface Report {
  id: number;
  quantity: number;
  reportDate: string;
  status: string;
  productId: number;
  hubuserId: number;
  product: Product | null;
}
interface Product {
  id: number;
  productName: string;
  price: string;
}

const ReportsList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null); // For offcanvas
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [isAddOffcanvasOpen, setIsAddOffcanvasOpen] = useState<boolean>(false);

  const [productNameList, setProductNameList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const hubuserIdSplit = useSelector(
    (state: RootState) => state.auth.existingUser
  );
  const hubuserId = hubuserIdSplit?.id;

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllReports(
        hubuserId,
        productName,
        page.toString(),
        limit.toString()
      );
      setReports(data?.report || []);
      setTotalPages(data?.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [hubuserId, productName, page, limit]);

  const fetchSingleReport = async (reportId: number) => {
    try {
      setLoading(true);
      const report = await getSingleReport(reportId);
      setSelectedReport(report);
      setIsOffcanvasOpen(true); // Open the offcanvas
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch delivery partners
  const fetchProduct = useCallback(async () => {
    try {
      const data = await getProductNames();
      console.log("product name", data);

      setProductNameList(data?.product || []);
    } catch (error) {
      console.error("Error fetching delivery users:", error);
    }
  }, []);

  useEffect(() => {
    fetchReport();
    fetchProduct();
  }, [fetchReport, fetchProduct]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleRefresh = () => {
    setProductName("");
    setPage(1);
    fetchReport();
  };

  const handleAdd = () => {
    fetchProduct();
    setIsAddOffcanvasOpen(true);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setSelectedReport(null);

    setIsAddOffcanvasOpen(false);
    setSelectedProduct(null);
    setTotalQuantity(0);
  };

  const handleReportCreate = async () => {
    if (!selectedProduct || totalQuantity <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    try {
      await postReport({
        hubuserId,
        quantity: totalQuantity, // ✅ Ensure the key matches the API expectation
        status: "submitted",
        productId: selectedProduct,
      });
      toast.success("Data created successfully");
      setIsAddOffcanvasOpen(false);
      fetchReport();
    } catch (error) {
      toast.error("Error creating report");
    }
  };

  return (
    <>
      <div className="flex items-center my-3 gap-2 justify-between">
        <h5 className="font-[family-name:var(--interSemiBold)]">Reports</h5>
        <div className="items-center grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-8">
          <div className="sm:col-span-3">
            <input
              type="search"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* <div className="sm:col-span-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-green-950 border-2 font-[family-name:var(--interRegular)] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400"
            />
          </div> */}
          <div className="sm:col-span-2">
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
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleAdd}
              className="font-[family-name:var(--interRegular)] bg-amber-900 text-white rounded flex items-center px-2 py-1"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>

      <table className="table-auto w-full border-spacing-2 p-4 border bg-white rounded-xl">
        <thead className="text-left font-semibold">
          <tr className="bg-green-950 text-white rounded-xl border font-[family-name:var(--interSemiBold)]">
            <th className="py-3 px-2">S.No</th>
            <th className="py-3 px-2">Product Name</th>
            <th className="py-3 px-2">Quantity</th>
            <th className="py-3 px-2">Report Date</th>
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
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((report, index) => (
              <tr
                key={report.id}
                className="hover:bg-green-100 cursor-pointer border-y"
              >
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {index + 1 + (page - 1) * limit}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {report?.product?.productName}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {report.quantity}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  {report.reportDate}
                </td>
                <td className="font-[family-name:var(--interRegular)] py-3 px-2">
                  <svg
                    onClick={() => fetchSingleReport(report.id)}
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
      {isOffcanvasOpen && selectedReport && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 overflow-auto">
          <div className="p-4">
            <div className="flex rounded-sm items-center justify-between bg-green-950 px-3 py-2">
              <h3 className="text-white font-bold text-lg  font-[family-name:var(--interSemiBold)]">
                Report Details
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
                <strong>Product Name:</strong>{" "}
                {selectedReport?.product?.productName}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Quantity:</strong> {selectedReport.quantity}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Report Date:</strong> {selectedReport.reportDate}
              </p>
              <p className="font-[family-name:var(--interRegular)] mt-2">
                <strong>Price:</strong> {selectedReport?.product?.price}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Data */}
      {isAddOffcanvasOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 overflow-auto">
          <div className="p-4">
            <div className="flex rounded-sm items-center justify-between bg-green-950 px-3 py-2">
              <h3 className="text-white font-bold text-lg">Report Add</h3>
              <button
                onClick={handleCloseOffcanvas}
                className="text-red-600 text-lg"
              >
                Close
              </button>
            </div>

            {/* Product Dropdown */}
            <div className="mt-3">
              <select
                value={selectedProduct || ""}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
                className="block w-full p-2 border rounded-md mb-4"
              >
                <option value="">Select Product</option>
                {productNameList.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div className="sm:col-span-3">
              <input
                type="number"
                placeholder="Quantity"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(Number(e.target.value))} // ✅ Convert string to number
                className="border-green-950 border-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleReportCreate}
              className="bg-green-950 text-white rounded px-4 py-2 mt-4"
            >
              Create Report
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportsList;
