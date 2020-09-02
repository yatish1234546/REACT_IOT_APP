import { getZonesAPI } from "../../api/zones";

import * as actionTypes from "./actionTypes";

export const fetchZones = zones => {
  return {
    type: actionTypes.GET_ZONES,
    payload: zones
  };
};

export const getZones = () => {
  return async dispatch => {
    const response = await getZonesAPI();
    if (response.data) {
      dispatch(fetchZones(response.data));
    }
  };
};
