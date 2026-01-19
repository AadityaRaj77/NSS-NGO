import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import UserHome from "./pages/UserHome";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Profile from "./pages/Profile";
import CreateCause from "./pages/CreateCause";
import Causes from "./pages/Causes";
import MyDonations from "./pages/MyDonations";
import AdminCauseDonations from "./pages/AdminCauseDonations";

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
        <Route
          path="/profile"
          element={
            <RoleProtectedRoute allowed={["USER"]}>
              <Profile />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/createcause"
          element={
            <RoleProtectedRoute allowed={["ADMIN"]}>
              <CreateCause />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/causes"
          element={
            <RoleProtectedRoute allowed={["USER"]}>
              <Causes />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/my-donations"
          element={
            <RoleProtectedRoute allowed={["USER"]}>
              <MyDonations />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/createcause/:causeId"
          element={
            <RoleProtectedRoute allowed={["ADMIN"]}>
              <AdminCauseDonations />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
