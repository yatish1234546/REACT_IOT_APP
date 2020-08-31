import * as actionTypes from "../actions/actionTypes";
import { setToken, getToken, clearToken } from "../../utils/token";
const initialState = {
  user: getToken(),
  users: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      setToken(action.payload);
      return { ...state, user: getToken() };
    case actionTypes.LOGOUT:
      clearToken();
      return {
        user: null,
        users: []
      };
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case actionTypes.SAVE_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        users: state.users.map(user => {
          return user._id === action.payload._id ? action.payload : user;
        })
      };
    default:
      return state;
  }
};

export default authReducer;
