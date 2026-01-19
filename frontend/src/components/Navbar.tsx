import { useNavigate } from "react-router-dom";
import { logout } from "../utils/token";

type Props = {
  role: "USER" | "ADMIN";
};

export default function Navbar({ role }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const btnClass =
    "text-sm font-medium text-gray-700 hover:text-blue-600 transition";

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1
        className="cursor-pointer text-xl font-bold text-blue-900"
        onClick={() => navigate(role === "ADMIN" ? "/admin" : "/home")}
      >
        NGO Platform
      </h1>

      <div className="flex items-center gap-6">
        {/* User Navbar */}
        {role === "USER" && (
          <>
            <button onClick={() => navigate("/causes")} className={btnClass}>
              Causes
            </button>

            <button
              onClick={() => navigate("/my-donations")}
              className={btnClass}
            >
              My Donations
            </button>

            <button onClick={() => navigate("/profile")} className={btnClass}>
              Profile
            </button>
          </>
        )}

        {/* Admin Navbar*/}
        {role === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")} className={btnClass}>
              Dashboard
            </button>

            <button
              onClick={() => navigate("/createcause")}
              className={btnClass}
            >
              Causes
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
