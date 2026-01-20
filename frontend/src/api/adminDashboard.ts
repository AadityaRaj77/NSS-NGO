import axios from "./axios";

export const getAdminDashboard = () =>
  axios.get("/admin/dashboard");
