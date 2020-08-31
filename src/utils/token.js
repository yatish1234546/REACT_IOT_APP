export const setToken = token => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(sessionStorage.getItem("token"));
};

export const clearToken = () => {
  sessionStorage.removeItem("token");
};
