import * as actionTypes from "../actions/actionTypes";
const initialState = {
  allFloors: []
};

const floorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FLOORS:
      return {
        allFloors: action.payload
      };
    case actionTypes.SAVE_FLOOR:
      return { allFloors: [...state.allFloors, action.payload] };
    default:
      return state;
  }
};

export default floorReducer;
