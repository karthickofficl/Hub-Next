import React from "react";

const DeliveryAttendance = () => {
  return (
    <table className="table-fixed w-full border-spacing-2 p-4">
      <thead className="text-left font-[family-name:var(--interSemiBold)]  ">
        <tr className="bg-orange-300 rounded">
          <th className="p-3">Order ID</th>
          <th className="p-3">Product name</th>
          <th className="p-3">Customer name</th>
          <th className="p-3">Price</th>
          <th className="p-3">Qty</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">
            #AGARAM845355
          </td>
          <td className="p-2">Milk</td>
          <td className="p-2">Jack</td>
          <td className="p-2">1961</td>
          <td className="p-2">1961</td>
          <td className="p-2">Completed</td>
        </tr>
        <tr>
          <td className="p-2">#AGARAM845355</td>
          <td className="p-2">The Eagles</td>
          <td className="p-2">The Eagles</td>
          <td className="p-2">1972</td>
          <td className="p-2">1972</td>
          <td className="p-2">Failed</td>
        </tr>
        <tr>
          <td className="p-2">#AGARAM845355</td>
          <td className="p-2">The Eagles</td>
          <td className="p-2">The Eagles</td>
          <td className="p-2">1972</td>
          <td className="p-2">1972</td>
          <td className="p-2">Pending</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DeliveryAttendance;
