import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar role="ADMIN" />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
      </div>
    </div>
  );
}
