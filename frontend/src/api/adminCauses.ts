import axios from "./axios";

export const createCause = (data: any) =>
  axios.post("/admin/causes", data);

export const listAdminCauses = () =>
  axios.get("/admin/causes");

export const updateCause = (cause_id: number, data: any) =>
  axios.patch(`/admin/causes/${cause_id}`, data);

