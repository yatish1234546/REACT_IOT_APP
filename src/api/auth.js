import http from "../utils/http";

export const loginAPI = payload => {
  return http.post("/auth/login", payload);
};

export const getAllUsersAPI = () => {
  return http.get("/user/getUsers");
};

export const saveUserAPI = payload => {
  return http.post("/user/addUser", payload);
};

export const editUserAPI = payload => {
  return http.put("/user/editUser", payload);
};
