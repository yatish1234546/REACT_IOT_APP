import * as actionTypes from "./actionTypes";
//MUTATIONS

export const setDrawer = state => {
  return {
    type: actionTypes.SET_DRAWER_STATE,
    payload: state
  };
};
