import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyDonations } from "../api/donations";

type Donation = {
  id: number;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING";
  created_at: string;
  payment_id: string | null;
  cause: {
    title: string;
  };
};

export default function MyDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const res = await getMyDonations();
      setDonations(res.data);
    } catch {
      alert("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <>
      <Navbar role="USER" />

      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-900">My Donations</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && donations.length === 0 && (
          <p className="text-gray-500">No donations yet</p>
        )}

        <div className="space-y-4">
          {donations.map((d) => (
            <div
              key={d.id}
              className="rounded-xl border bg-white p-4 shadow-sm flex justify-between"
            >
              <div>
                <h2 className="font-semibold text-blue-900">
                  {d.cause?.title || "Unknown Cause"}
                </h2>

                <p className="text-sm text-gray-600">Amount: ₹{d.amount}</p>

                <p className="text-xs text-gray-400">
                  {new Date(d.created_at).toLocaleString()}
                </p>
              </div>

              <span
                className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  d.status === "SUCCESS"
                    ? "bg-green-100 text-green-700"
                    : d.status === "FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
