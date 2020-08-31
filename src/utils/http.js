import axios from "axios";
import store from "../state/rootReducer";
const service = axios.create({
  baseURL: "http://localhost:5000"
});

service.interceptors.request.use(
  config => {
    const user = store.getState().auth.user;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    console.error("Could not process request. Error: ", error); // for debug
    Promise.reject(error);
  }
);

export default service;
