import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import RoleProtectedRoute from "./RoleProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowed={["ADMIN"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <RoleProtectedRoute allowed={["USER"]}>
              <UserHome />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
