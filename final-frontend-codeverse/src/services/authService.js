import api from "./api";

// These map 1:1 to the endpoints your teammate has built so far.
// Swap paths here if the backend contract changes - nothing else in the
// app needs to know about raw URLs.

export const authService = {
  register: (payload) => api.post("/auth/register/", payload),
  // payload: { email, first_name, last_name, role, password, confirm_password }

  login: (payload) => api.post("/auth/login/", payload),
  // payload: { email, password }

  logout: (refresh) => api.post("/auth/logout/", { refresh }),

  refresh: (refresh) => api.post("/auth/refresh/", { refresh }),

  getProfile: () => api.get("/auth/profile/"),

  updateProfile: (payload) => api.put("/auth/profile/", payload),

  patchProfile: (payload) => api.patch("/auth/profile/", payload),

  changePassword: (payload) => api.post("/auth/change-password/", payload),
  // payload: { old_password, new_password, confirm_password } - confirm field
  // names with your teammate and adjust here if needed.
};

export default authService;
