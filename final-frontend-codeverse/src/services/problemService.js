import api from "./api";

export const problemService = {
  list: () => api.get("/problems/"),

  get: (slug) => api.get(`/problems/${slug}/`),
};