import api from "./axios";

export const login = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const register = (
  email: string,
  password: string,
  role: "USER" | "ADMIN",
  admin_key?: string
) => {
  return api.post("/auth/register", {
    email,
    password,
    role,
    admin_key,
  });
};

export const me = (token: string) => {
  return api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
