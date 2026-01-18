import { useState } from "react";
import { createDonation, verifyDonation } from "../api/donations";

export default function DonateModal({ cause, onClose }: any) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const donate = async () => {
    setLoading(true);

    const res = await createDonation(cause.id, Number(amount));

    // simulate gateway delay
    setTimeout(async () => {
      await verifyDonation(res.data.donation_id, res.data.payment.payment_id);

      alert("Donation successful");
      onClose();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-[360px] rounded-2xl bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-blue-900">
          Donate to {cause.title}
        </h2>

        <input
          type="number"
          placeholder="Amount"
          className="w-full rounded-xl border px-4 py-3"
          onChange={(e) => setAmount(e.target.value)}
        />

        <p className="text-xs text-gray-500">
          Sandbox test cases:
          <br />
          ₹1 → Success
          <br />
          ₹2 → Failed
          <br />
          ₹3 → Pending
        </p>

        <button
          disabled={loading}
          onClick={donate}
          className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button onClick={onClose} className="w-full text-sm text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
