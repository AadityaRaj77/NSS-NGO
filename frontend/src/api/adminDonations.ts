import axios from "./axios";

export const getAdminCauseDonations = (
  causeId: number,
  params?: {
    from?: string;
    to?: string;
    sort?: string;
  }
) =>
  axios.get(`/admin/causes/${causeId}/donations`, {
    params,
  });
