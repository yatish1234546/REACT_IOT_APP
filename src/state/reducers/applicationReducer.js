import * as actionTypes from "../actions/actionTypes";
const initialState = {
  drawer: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DRAWER_STATE:
      return {
        drawer: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
