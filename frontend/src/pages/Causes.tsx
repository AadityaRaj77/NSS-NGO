import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCauses } from "../api/causes";

type Cause = {
  id: number;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  is_active: boolean;
};

export default function Causes() {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCauses = async () => {
    try {
      const res = await getCauses();
      setCauses(res.data);
    } catch {
      alert("Failed to load causes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  return (
    <>
      <Navbar role="USER" />

      <div className="mx-auto max-w-5xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-blue-900">
          Donation Causes
        </h1>

        {loading && <p className="text-gray-500">Loading causes...</p>}

        {!loading && causes.length === 0 && (
          <p className="text-gray-500">No causes available</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {causes.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-blue-900">
                  {c.title}
                </h2>

                <span
                  className={`text-xs font-semibold ${
                    c.is_active ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {c.is_active ? "ACTIVE" : "EXPIRED"}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{c.description}</p>

              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Target:</span> ₹
                  {c.target_amount}
                </p>
                <p>
                  <span className="font-medium">Collected:</span> ₹
                  {c.current_amount}
                </p>
                {c.deadline && (
                  <p>
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(c.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>

              <button
                disabled={!c.is_active}
                onClick={() => alert("Payment flow coming next")}
                className={`mt-5 w-full rounded-xl py-3 font-semibold text-white transition ${
                  c.is_active
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                {c.is_active ? "Donate" : "Expired"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
