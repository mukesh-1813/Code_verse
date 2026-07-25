import api from "./api";

export const judgeService = {
  run: (payload) => api.post("/v1/judge/run/", payload),
};