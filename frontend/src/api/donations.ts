import axios from "./axios";

export const createDonation = (cause_id: number, amount: number) =>
  axios.post("/donations/create", {
    cause_id,
    amount,
  });

export const verifyDonation = (
  donation_id: number,
  payment_id: string
) =>
  axios.post("/donations/verify", {
    donation_id,
    payment_id,
  });

export const getMyDonations = () =>
  axios.get("/donations/me");
