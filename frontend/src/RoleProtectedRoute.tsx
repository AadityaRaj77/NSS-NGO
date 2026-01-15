import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { getMe } from "./api/auth";

type Props = {
  children: JSX.Element;
  allowed: ("ADMIN" | "USER")[];
};

export default function RoleProtectedRoute({ children, allowed }: Props) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    getMe()
      .then((res) => {
        if (allowed.includes(res.data.role)) {
          setAuthorized(true);
        }
      })
      .catch(() => {
        // invalid / missing token
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!authorized) return <Navigate to="/" replace />;

  return children;
}
