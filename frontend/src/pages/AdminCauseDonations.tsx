import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAdminCauseDonations } from "../api/adminDonations";

export default function AdminCauseDonations() {
  const { causeId } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("date_desc");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAdminCauseDonations(Number(causeId), {
        sort,
        from: from || undefined,
        to: to || undefined,
      });
      setData(res.data);
    } catch {
      alert("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sort]);

  const exportCSV = () => {
    if (!data) return;

    const rows = data.donations.map(
      (d: any) =>
        `${d.donor.name || ""},${d.donor.email},${d.amount},${new Date(
          d.created_at,
        ).toLocaleString()}`,
    );

    const csv = ["Name,Email,Amount,Date", ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "donations.csv";
    a.click();
  };

  return (
    <>
      <Navbar role="ADMIN" />

      <div className="mx-auto max-w-6xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Donations for Cause
        </h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && data && (
          <>
            {/* SUMMARY */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4 shadow">
                <p className="text-sm text-gray-500">Total Donations</p>
                <p className="text-2xl font-bold text-blue-900">
                  {data.total_donations}
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 shadow">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{data.total_amount}
                </p>
              </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3 items-end">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border px-3 py-2"
              >
                <option value="date_desc">Latest first</option>
                <option value="date_asc">Oldest first</option>
                <option value="amount_desc">Amount high → low</option>
                <option value="amount_asc">Amount low → high</option>
                <option value="name_asc">Name A → Z</option>
              </select>

              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />

              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="rounded-lg border px-3 py-2"
              />

              <button
                onClick={fetchData}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Apply
              </button>

              <button
                onClick={exportCSV}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Export CSV
              </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-xl bg-white shadow">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.donations.map((d: any) => (
                    <tr key={d.id} className="border-t">
                      <td className="px-4 py-3">{d.donor.name || "—"}</td>
                      <td className="px-4 py-3">{d.donor.email}</td>
                      <td className="px-4 py-3 font-semibold">₹{d.amount}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(d.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
