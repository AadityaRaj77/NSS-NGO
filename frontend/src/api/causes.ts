import axios from "./axios";

export const getCauses = () => axios.get("/causes");
export const donateToCause = (causeId: number, amount: number) =>
  axios.post("/donations", { cause_id: causeId, amount });
