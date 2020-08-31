import { getFloorsAPI, addFloorAPI } from "../../api/floor";

import * as actionTypes from "./actionTypes";
//MUTATIONS

export const fetchFloors = floors => {
  return {
    type: actionTypes.GET_FLOORS,
    payload: floors
  };
};

export const saveFloor = floor => {
  return {
    type: actionTypes.SAVE_FLOOR,
    payload: floor
  };
};

//ACTIONS
export const getFloors = () => {
  return async dispatch => {
    const response = await getFloorsAPI();
    if (response.data) {
      dispatch(fetchFloors(response.data));
    }
  };
};

export const addFloor = payload => {
  return async dispatch => {
    const response = await addFloorAPI(payload);
    if (response.data) {
      dispatch(saveFloor(response.data));
    }
  };
};
