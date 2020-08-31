import {
  loginAPI,
  getAllUsersAPI,
  saveUserAPI,
  editUserAPI
} from "../../api/auth";

import * as actionTypes from "./actionTypes";
//MUTATIONS

export const saveToken = user => {
  return {
    type: actionTypes.LOGIN,
    payload: user
  };
};

export const saveUsers = users => {
  return {
    type: actionTypes.GET_USERS,
    payload: users
  };
};

//ACTIONS
export const login = payload => {
  return async dispatch => {
    const response = await loginAPI(payload);
    if (response.data) {
      dispatch(saveToken(response.data));
    }
  };
};

export const saveUser = user => {
  return {
    type: actionTypes.SAVE_USER,
    payload: user
  };
};

export const addUser = payload => {
  return async dispatch => {
    const response = await saveUserAPI(payload);
    if (response.data) {
      dispatch(saveUser(response.data));
    }
  };
};

export const updateUser = payload => {
  return {
    type: actionTypes.EDIT_USER,
    payload
  };
};

export const editUser = payload => {
  return async dispatch => {
    const response = await editUserAPI(payload);
    if (response.data) {
      dispatch(updateUser(payload));
    }
  };
};
export const getAllUsers = () => {
  return async dispatch => {
    const response = await getAllUsersAPI();
    if (response.data) {
      dispatch(saveUsers(response.data));
    }
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
