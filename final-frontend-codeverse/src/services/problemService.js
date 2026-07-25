import api from "./api";

export const problemService = {
  list: (page = 1) => api.get(`/problems/?page=${page}`),

  get: (slug) => api.get(`/problems/${slug}/`),
};