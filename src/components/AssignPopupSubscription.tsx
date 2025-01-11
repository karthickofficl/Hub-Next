import React, { useState } from "react";
import { assignDeliveryPartner } from "@/lib/api/subscriptionApi";

interface DeliveryUser {
  id: number;
  username: string;
  address: string;
}

interface AssignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: number;
  assignedIds: string;
  startDate: string;
  hubuserId: string;
  deliveryPartner: DeliveryUser[];
}

const AssignPopupSubscription: React.FC<AssignPopupProps> = ({
  isOpen,
  onClose,
  subscriptionId,
  assignedIds,
  startDate,
  hubuserId,
  deliveryPartner,
}) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssign = async () => {
    if (!selectedUser) {
      setError("Please select a delivery user.");
      return;
    }

    setLoading(true);
    setError(null); // Clear existing errors

    try {
      // Call the assignDeliveryPartner API function
      await assignDeliveryPartner(
        hubuserId,
        subscriptionId.toString(), // Ensure the ID is passed as a string
        assignedIds,
        startDate,
        selectedUser.toString() // Ensure the ID is passed as a string
      );

      alert("Checkout assigned successfully!");
    //   await getUnassignedCheckout(data);
      onClose();
    } catch (err) {
      console.error("Failed to assign checkout", err);
      setError("Failed to assign checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4 font-[family-name:var(--interSemiBold)]">
          Assign Delivery Partner
        </h2>

        {error && (
          <p className="text-red-500 mb-4 font-[family-name:var(--interRegular)]">
            {error}
          </p>
        )}

        <select
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md mb-4 font-[family-name:var(--interRegular)]"
        >
          <option value="">Select Delivery User</option>
          {deliveryPartner.length > 0 ? (
            deliveryPartner.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} - {user.address}
              </option>
            ))
          ) : (
            <option disabled>No delivery users available</option>
          )}
        </select>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FFA500] text-white rounded-md font-[family-name:var(--interRegular)]"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-green-800 text-white rounded-md font-[family-name:var(--interRegular)]"
            disabled={loading || deliveryPartner.length === 0}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPopupSubscription;
