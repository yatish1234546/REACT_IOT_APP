import http from "../utils/http";

export const getFloorsAPI = () => {
  return http.get("/floor/getFloors");
};

export const addFloorAPI = payload => {
  return http.post("/floor/addFloor", payload);
};
