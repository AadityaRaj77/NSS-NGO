import axios from "./axios";

export const getProfile = () => axios.get("/users/profile");

export const createProfile = (data: any) =>
  axios.post("/users/profile", data);

export const updateProfile = (data: any) =>
  axios.put("/users/profile", data);
