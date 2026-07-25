import api from "./api";

export const submissionService = {
  create: (payload) => api.post("/v1/submissions/", payload),
  get: (id) => api.get(`/v1/submissions/${id}/`),
  list: (page = 1) => api.get(`/v1/submissions/list/?page=${page}`),
};
