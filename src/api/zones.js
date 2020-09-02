import http from "../utils/http";

export const getZonesAPI = () => {
  return http.get("/zone/getAllZones");
};
