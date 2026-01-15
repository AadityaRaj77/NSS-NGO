import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/token";

type Props = {
  role: "USER" | "ADMIN";
};

export default function Navbar({ role }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-blue-900">NGO Platform</h1>

      <div className="flex items-center gap-6">
        {role === "USER" && (
          <>
            <button onClick={() => navigate("/home")} className="nav-btn">
              Home
            </button>
            <button onClick={() => navigate("/donate")} className="nav-btn">
              Donate
            </button>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <button onClick={() => navigate("/admin")} className="nav-btn">
              Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/users")}
              className="nav-btn"
            >
              Users
            </button>
          </>
        )}

        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white font-medium hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
