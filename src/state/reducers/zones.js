import * as actionTypes from "../actions/actionTypes";
const initialState = {
  zones: []
};

const zonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ZONES:
      return {
        zones: action.payload
      };
    default:
      return state;
  }
};

export default zonesReducer;
