import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

type Cause = {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  total_donations: number;
  total_amount: number;
};

export default function AdminDashboard() {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/dashboard");
      setCauses(Array.isArray(res.data) ? res.data : []);
    } catch {
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <Navbar role="ADMIN" />

      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && causes.length === 0 && (
          <p className="text-gray-500">No active causes</p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {causes.map((c) => (
            <div key={c.id} className="rounded-xl border bg-white p-5 shadow">
              <h2 className="text-lg font-semibold text-blue-900">{c.title}</h2>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Target:</span> ₹
                  {c.target_amount}
                </p>
                <p>
                  <span className="font-medium">Collected:</span> ₹
                  {c.total_amount}
                </p>
                <p>
                  <span className="font-medium">Donors:</span>{" "}
                  {c.total_donations}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
