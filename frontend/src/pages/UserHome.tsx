import { useNavigate } from "react-router-dom";
import { logout } from "../utils/token";

export default function UserHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">User Home</h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 text-gray-600">Welcome to the NGO platform.</div>
    </div>
  );
}
